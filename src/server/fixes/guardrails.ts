/** Limits every Leaflyst pull request must stay within. Enforced in code after the agent finishes. */
export const LIMITS = { maxFiles: 10, maxChangedLines: 300 };

// Paths a fix must never touch, whatever the agent believes.
const PROTECTED: RegExp[] = [
  /^\.github\//,
  /(^|\/)\.env(\..*)?$/,
  /(^|\/)(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|bun\.lockb?|npm-shrinkwrap\.json)$/,
  /(^|\/)package\.json$/,
  /(^|\/)(auth|authentication|login|session|sessions|payment|payments|billing|checkout|stripe)(\/|\.|$)/i,
  /(^|\/)middleware\.(ts|js)$/,
  /(^|\/)(vercel\.json|netlify\.toml|Dockerfile|docker-compose\.ya?ml)$/,
];

export interface ChangedFile {
  filename: string;
  additions: number;
  deletions: number;
  status?: string;
}

export interface GuardrailResult {
  ok: boolean;
  problems: string[];
  stats: { files: number; additions: number; deletions: number };
}

export function checkGuardrails(files: ChangedFile[]): GuardrailResult {
  const stats = {
    files: files.length,
    additions: files.reduce((s, f) => s + f.additions, 0),
    deletions: files.reduce((s, f) => s + f.deletions, 0),
  };
  const problems: string[] = [];
  if (files.length === 0) problems.push("the branch changes no files");
  if (files.length > LIMITS.maxFiles)
    problems.push(`changes ${files.length} files, the limit is ${LIMITS.maxFiles}`);
  if (stats.additions + stats.deletions > LIMITS.maxChangedLines) {
    problems.push(
      `changes ${stats.additions + stats.deletions} lines, the limit is ${LIMITS.maxChangedLines}`,
    );
  }
  for (const f of files) {
    if (PROTECTED.some((re) => re.test(f.filename)))
      problems.push(`touches a protected path: ${f.filename}`);
  }
  return { ok: problems.length === 0, problems, stats };
}
