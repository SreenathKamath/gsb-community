export function splitNumberedList(value) {
  const cleanValue = String(value || "").replace(/\s+/g, " ").trim();
  if (!cleanValue) return [];

  const numberedItems = cleanValue
    .split(/\s*(?=\d+\)\s*)/g)
    .map((item) => item.replace(/^\d+\)\s*/, "").replace(/^\((.*?)\)$/, "$1").trim())
    .filter(Boolean);

  return numberedItems.length > 1 ? numberedItems : [cleanValue];
}

export function parseBoolean(value) {
  return ["true", "yes", "1"].includes(String(value || "").toLowerCase().trim());
}
