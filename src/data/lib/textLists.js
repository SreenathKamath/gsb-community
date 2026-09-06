// Trims stray separator punctuation Excel authors leave behind between numbered
// entries (e.g. "1)Name,\n2)Name,"), then unwraps a value that is *entirely*
// wrapped in parens even after that punctuation is gone (e.g. "(patron),").
function cleanListItem(item) {
  let cleaned = item.trim().replace(/^[,;]+|[,;]+$/g, "").trim();
  const wrapped = cleaned.match(/^\((.*)\)$/);
  if (wrapped) {
    cleaned = wrapped[1].trim();
  }
  return cleaned;
}

export function splitNumberedList(value) {
  const cleanValue = String(value || "").replace(/\s+/g, " ").trim();
  if (!cleanValue) return [];

  // Accepts "1)" or "1." as the numbering marker so inconsistent formatting
  // across organizations' spreadsheets still parses. The (?<!\d) is required:
  // without it, a two-digit marker like "10)" also matches "\d+[).]" starting
  // at its second digit ("0)"), so the list gets sheared into an extra "1"
  // fragment plus the real entry for every marker above 9.
  const numberedItems = cleanValue
    .split(/\s*(?=(?<!\d)\d+[).]\s*)/g)
    .map((item) => cleanListItem(item.replace(/^\d+[).]\s*/, "")))
    .filter(Boolean);

  return numberedItems.length > 1 ? numberedItems : [cleanListItem(cleanValue)];
}

// Flags data-entry placeholders (a bare "1", "-", "N/A", ...) that some
// spreadsheet rows use as an unfilled slot marker, so callers can drop them
// instead of rendering them as if they were real content.
export function isPlaceholderValue(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return true;
  if (/^[\d\s.\-–_]+$/.test(trimmed)) return true;
  return /^(n\/?a|tbd|todo|pending)$/i.test(trimmed);
}

export function parseBoolean(value) {
  return ["true", "yes", "1"].includes(String(value || "").toLowerCase().trim());
}
