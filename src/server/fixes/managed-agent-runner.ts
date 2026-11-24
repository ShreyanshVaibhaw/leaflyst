import Anthropic from "@anthropic-ai/sdk";
import { env } from "@/server/env";
import { fixDescription, fixRubric } from "./briefs";
import type { FixRunInput, FixRunner, FixRunResult } from "./runner";

const TIME_LIMIT_MS = 20 * 60_000;
// Session budget in minor units of USD: "500" is 5 dollars of list cost.
const BUDGET_MINOR_UNITS = "500";

interface AgentFinal {
  status?: string;
  summary?: string;
  files?: string[];
}

/** Pulls the last JSON object out of the agent's final message. */
export function parseFinalMessage(text: string): AgentFinal | null {
  const matches = text.match(/\{[\s\S]*\}/g);
  if (!matches) return null;
  for (const candidate of matches.toReversed()) {
    try {
      const value = JSON.parse(candidate) as AgentFinal;
      if (value && typeof value === "object" && "status" in value) return value;
    } catch {
      // try the next candidate
    }
  }
  return null;
}

/**
 * Runs a fix as a Claude Managed Agents session: Anthropic hosts the agent loop and
 * a fresh container, the repo is mounted through Anthropic's git proxy, and a
 * separate grader checks the work against the rubric before the session ends.
 */
export class ManagedAgentFixRunner implements FixRunner {
  private client = new Anthropic({ apiKey: env().ANTHROPIC_API_KEY });

  async run({ task, repoUrl, repoToken }: FixRunInput): Promise<FixRunResult> {
    const e = env();
    if (!e.FIX_AGENT_ID || !e.FIX_ENVIRONMENT_ID) {
      return {
        status: "needs_human",
        summary: "The fix agent is not set up.",
        reason: "FIX_AGENT_ID or FIX_ENVIRONMENT_ID is missing",
      };
    }
    const session = await this.client.beta.sessions.create({
      agent: e.FIX_AGENT_ID,
      environment_id: e.FIX_ENVIRONMENT_ID,
      title: `Leaflyst fix ${task.findingId.slice(0, 8)}: ${task.title}`.slice(0, 200),
      resources: [
        {
          type: "github_repository",
          url: repoUrl,
          authorization_token: repoToken,
          mount_path: "/workspace/repo",
          checkout: { type: "branch", name: task.defaultBranch },
        },
      ],
      budget: { type: "limit", max_list_cost: { amount: BUDGET_MINOR_UNITS, currency: "USD" } },
    });

    const deadline = Date.now() + TIME_LIMIT_MS;
    let lastText = "";
    let outcome: string | null = null;
    let stopReason: string | null = null;
    let started = false;

    // The event stream has no replay, so reconnect and check status if it drops.
    for (let attempt = 0; attempt < 4 && !stopReason; attempt++) {
      try {
        const stream = await this.client.beta.sessions.events.stream(session.id);
        if (!started) {
          started = true;
          await this.client.beta.sessions.events.send(session.id, {
            events: [
              {
                type: "user.define_outcome",
                description: fixDescription(task),
                rubric: { type: "text", content: fixRubric(task) },
                max_iterations: 3,
              },
            ],
          });
        }
        for await (const event of stream) {
          if (Date.now() > deadline) {
            await this.client.beta.sessions.events.send(session.id, {
              events: [{ type: "user.interrupt" }],
            });
            stopReason = "time_limit";
            break;
          }
          if (event.type === "agent.message") {
            const text = event.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
            if (text.trim()) lastText = text;
          } else if (event.type === "agent.tool_use" || event.type === "agent.mcp_tool_use") {
            // Unattended: anything the policy could not decide is denied.
            if (event.evaluated_permission === "ask") {
              await this.client.beta.sessions.events.send(session.id, {
                events: [{ type: "user.tool_confirmation", tool_use_id: event.id, result: "deny" }],
              });
            }
          } else if (event.type === "span.outcome_evaluation_end") {
            outcome = event.result;
          } else if (event.type === "session.status_idle") {
            if (event.stop_reason.type !== "requires_action") {
              stopReason = event.stop_reason.type;
              break;
            }
          } else if (event.type === "session.status_terminated") {
            stopReason = "terminated";
            break;
          }
        }
      } catch (error) {
        const current = await this.client.beta.sessions.retrieve(session.id);
        if (current.status === "idle" || current.status === "terminated")
          stopReason = current.status;
        else if (attempt === 3) throw error;
      }
    }

    const final = parseFinalMessage(lastText);
    const base = { sessionId: session.id, files: final?.files ?? [] };
    if (stopReason === "budget_reached")
      return {
        ...base,
        status: "needs_human",
        summary: "The fix used up its budget.",
        reason: "budget_reached",
      };
    if (stopReason === "time_limit")
      return {
        ...base,
        status: "needs_human",
        summary: "The fix ran past the 20 minute limit.",
        reason: "time_limit",
      };
    if (outcome !== "satisfied") {
      return {
        ...base,
        status: "needs_human",
        summary: final?.summary ?? "The fix did not pass review.",
        reason: `grader result: ${outcome ?? "none"}`,
      };
    }
    if (final?.status !== "pushed") {
      return {
        ...base,
        status: "needs_human",
        summary: final?.summary ?? "The agent did not push a change.",
        reason: "agent reported needs_human",
      };
    }
    return { ...base, status: "pushed", summary: final.summary ?? task.title };
  }
}
