/**
 * One-time setup for the fix agent and its environment. Not part of the request path.
 *
 *   pnpm tsx agents/fix-agent/setup.ts
 *
 * With FIX_AGENT_ID and FIX_ENVIRONMENT_ID already set it updates the agent to match
 * this file (a new version) instead of creating another one.
 */
import Anthropic from "@anthropic-ai/sdk";
import { FIX_AGENT_SYSTEM } from "../../src/server/fixes/briefs";

const client = new Anthropic();

const agentConfig = {
  name: "Leaflyst fix agent",
  description: "Makes one small SEO fix in a customer's Next.js repository and pushes a branch.",
  model: { id: "claude-opus-5-5", effort: "high" as const },
  system: FIX_AGENT_SYSTEM,
  tools: [
    {
      type: "agent_toolset_20260401" as const,
      default_config: { enabled: true, permission_policy: { type: "auto" as const } },
      // The fix needs the repo and package registries only, never the web.
      configs: [
        { name: "web_fetch" as const, enabled: false },
        { name: "web_search" as const, enabled: false },
      ],
    },
  ],
};

async function main() {
  const agentId = process.env.FIX_AGENT_ID;
  const agent = agentId
    ? await client.beta.agents.update(agentId, agentConfig)
    : await client.beta.agents.create(agentConfig);

  const environmentId =
    process.env.FIX_ENVIRONMENT_ID ??
    (
      await client.beta.environments.create({
        name: "leaflyst-fix",
        config: {
          type: "cloud",
          networking: { type: "limited", allow_package_managers: true, allow_mcp_servers: false },
        },
      })
    ).id;

  console.log(`FIX_AGENT_ID=${agent.id}`);
  console.log(`FIX_ENVIRONMENT_ID=${environmentId}`);
  console.log(`agent version ${agent.version}. Put both IDs in .env.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
