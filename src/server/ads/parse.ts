import Papa from "papaparse";

export type AdsReportKind = "search_terms" | "landing_pages" | "campaign_days";

export interface AdsRow {
  term?: string;
  matchType?: string;
  campaign?: string;
  url?: string;
  day?: string;
  clicks: number;
  impressions: number;
  cost: number;
  conversions: number;
}

export interface ParsedAdsReport {
  kind: AdsReportKind;
  rows: AdsRow[];
  currency: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  skippedRows: number;
}

// Google Ads column names, with the variants seen across export settings.
const COLUMNS = {
  term: ["search term"],
  matchType: ["match type", "search terms match type", "keyword match type"],
  campaign: ["campaign"],
  url: ["landing page", "expanded landing page", "final url", "page"],
  day: ["day", "date"],
  clicks: ["clicks"],
  impressions: ["impr.", "impressions", "impr"],
  cost: ["cost"],
  conversions: ["conversions", "conv."],
  currency: ["currency code", "currency"],
};

export class AdsParseError extends Error {}

const norm = (s: string) => s.replace(/^﻿/, "").trim().toLowerCase();

/** "1,234.56", "$12.30", "--" and "12%" all become numbers. */
export function parseNumber(raw: string | undefined): number {
  if (!raw) return 0;
  const s = raw.replace(/[^\d.,-]/g, "");
  if (!s || s === "-" || s === "--") return 0;
  // A comma followed by exactly two digits at the end is a decimal comma.
  const decimalComma = /,\d{1,2}$/.test(s) && !s.includes(".");
  const clean = decimalComma ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
  const n = Number(clean);
  return Number.isFinite(n) ? n : 0;
}

const MONTHS: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function parseDate(s: string): string | null {
  const iso = s.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;
  const long = s.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
  if (long) {
    const m = MONTHS[(long[1] ?? "").toLowerCase()];
    if (m) return `${long[3]}-${m}-${(long[2] ?? "").padStart(2, "0")}`;
  }
  return null;
}

/**
 * Reads a Google Ads report export. Exports start with a title line and a date
 * range line above the header, and end with totals rows; both are skipped.
 */
export function parseAdsCsv(text: string): ParsedAdsReport {
  const lines = Papa.parse<string[]>(text.replace(/^﻿/, ""), { skipEmptyLines: true }).data;
  const headerIndex = lines.findIndex((row) => {
    const cells = row.map(norm);
    return cells.includes("clicks") && (cells.includes("cost") || cells.includes("impr."));
  });
  if (headerIndex === -1)
    throw new AdsParseError(
      "This does not look like a Google Ads report: no header row with Clicks and Cost was found.",
    );
  const header = (lines[headerIndex] ?? []).map(norm);
  const col = (names: string[]) => header.findIndex((h) => names.includes(h));
  const idx = Object.fromEntries(
    Object.entries(COLUMNS).map(([k, names]) => [k, col(names)]),
  ) as Record<keyof typeof COLUMNS, number>;

  let kind: AdsReportKind;
  if (idx.term >= 0) kind = "search_terms";
  else if (idx.url >= 0) kind = "landing_pages";
  else if (idx.day >= 0 && idx.campaign >= 0) kind = "campaign_days";
  else
    throw new AdsParseError(
      "Unsupported report. Upload the Search terms, Landing pages, or Campaigns by day report.",
    );

  let period: string[] = [];
  for (const row of lines.slice(0, headerIndex)) {
    const joined = row.join(" ");
    const dates = joined
      .split(/\s+-\s+|\s+to\s+/)
      .map(parseDate)
      .filter(Boolean) as string[];
    if (dates.length >= 2) period = dates;
  }

  const rows: AdsRow[] = [];
  let skipped = 0;
  let currency: string | null = null;
  for (const row of lines.slice(headerIndex + 1)) {
    const first = norm(row[0] ?? "");
    // Totals rows: "Total: ...", "Total", or blank first cell with a totals marker anywhere.
    if (first.startsWith("total") || row.some((c) => /^total:/i.test(c.trim()))) {
      skipped++;
      continue;
    }
    const get = (k: keyof typeof COLUMNS) => (idx[k] >= 0 ? (row[idx[k]] ?? "").trim() : undefined);
    if (idx.currency >= 0 && !currency) currency = get("currency") || null;
    const r: AdsRow = {
      clicks: parseNumber(get("clicks")),
      impressions: parseNumber(get("impressions")),
      cost: parseNumber(get("cost")),
      conversions: parseNumber(get("conversions")),
    };
    if (kind === "search_terms") {
      r.term = get("term");
      r.matchType = get("matchType");
      r.campaign = get("campaign");
      if (!r.term) {
        skipped++;
        continue;
      }
    } else if (kind === "landing_pages") {
      r.url = get("url");
      if (!r.url || !/^https?:\/\//i.test(r.url)) {
        skipped++;
        continue;
      }
    } else {
      r.campaign = get("campaign");
      r.day = parseDate(get("day") ?? "") ?? undefined;
      if (!r.campaign || !r.day) {
        skipped++;
        continue;
      }
    }
    rows.push(r);
  }
  if (rows.length === 0) throw new AdsParseError("The report has a header but no data rows.");
  return {
    kind,
    rows,
    currency,
    periodStart: period[0] ?? null,
    periodEnd: period[1] ?? null,
    skippedRows: skipped,
  };
}
