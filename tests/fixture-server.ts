import { spawn, type ChildProcess } from "node:child_process";
import { cpSync, existsSync, rmSync } from "node:fs";
import path from "node:path";

export const FIXTURE_DIR = path.resolve(import.meta.dirname, "../fixtures/demo-site");

async function waitFor(url: string, timeoutMs = 60_000) {
  const until = Date.now() + timeoutMs;
  while (Date.now() < until) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 300));
  }
  throw new Error(`timed out waiting for ${url}`);
}

function nextBin(dir: string) {
  return path.join(dir, "node_modules", ".bin", "next");
}

/** Builds (if needed) and serves a Next.js site directory. */
export async function serveSite(dir: string, port: number, opts: { build?: boolean } = {}) {
  if (opts.build || !existsSync(path.join(dir, ".next", "BUILD_ID"))) {
    await new Promise<void>((resolve, reject) => {
      const p = spawn(nextBin(FIXTURE_DIR), ["build"], {
        cwd: dir,
        stdio: "pipe",
        env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
      });
      let out = "";
      p.stdout.on("data", (d) => (out += d));
      p.stderr.on("data", (d) => (out += d));
      p.on("exit", (code) =>
        code === 0
          ? resolve()
          : reject(new Error(`next build failed in ${dir}\n${out.slice(-2000)}`)),
      );
    });
  }
  const child: ChildProcess = spawn(nextBin(FIXTURE_DIR), ["start", "--port", String(port)], {
    cwd: dir,
    stdio: "ignore",
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
  });
  const url = `http://localhost:${port}`;
  await waitFor(`${url}/`);
  return { url, stop: () => child.kill("SIGTERM") };
}

/** A throwaway copy of the fixture site, for tests that change its code. */
export function copyFixture(dest: string) {
  rmSync(dest, { recursive: true, force: true });
  cpSync(FIXTURE_DIR, dest, {
    recursive: true,
    filter: (src) => !src.includes(`${path.sep}.next`) && !src.endsWith(`${path.sep}node_modules`),
  });
  // Reuse the fixture's installed packages.
  cpSync(path.join(FIXTURE_DIR, "node_modules"), path.join(dest, "node_modules"), {
    recursive: true,
    verbatimSymlinks: true,
  });
  return dest;
}
