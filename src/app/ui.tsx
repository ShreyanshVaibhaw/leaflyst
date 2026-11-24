import type { ReactNode } from "react";

export function SeverityBadge({ severity }: { severity: string }) {
  return <span className={`badge sev-${severity}`}>{severity}</span>;
}

const STATUS_LABEL: Record<string, string> = {
  open: "Open",
  queued: "Queued",
  fixing: "Fixing",
  pr_open: "Pull request open",
  merged: "Merged",
  verified: "Verified live",
  failed_verification: "Failed live check",
  needs_human: "Needs a person",
  dismissed: "Dismissed",
  resolved: "Resolved",
  reverted: "Reverted",
  closed: "Closed unmerged",
};

export function StatusBadge({ status }: { status: string }) {
  const ok = ["verified", "resolved", "merged", "pr_open"].includes(status);
  const bad = ["failed_verification", "needs_human"].includes(status);
  return (
    <span className={`badge ${ok ? "st-ok" : bad ? "sev-high" : "st-neutral"}`}>
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="empty card">{children}</div>;
}

export function pct(x: number) {
  return `${Math.round(x * 100)}%`;
}

export function money(x: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: x >= 100 ? 0 : 2,
  }).format(x);
}

export function when(d: Date | string | null | undefined) {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** A rate with its interval drawn behind it. */
export function RateBar({ rate, low, high }: { rate: number; low: number; high: number }) {
  return (
    <div className="bar" title={`${pct(rate)} (range ${pct(low)} to ${pct(high)})`}>
      <i style={{ left: `${low * 100}%`, width: `${Math.max(1, (high - low) * 100)}%` }} />
      <span style={{ left: 0, width: `${rate * 100}%` }} />
    </div>
  );
}
