const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const entities = { amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'" };

function decodeXml(value = "") {
  return value.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (_, entity) => {
    if (entity[0] === "#") {
      const radix = entity[1]?.toLowerCase() === "x" ? 16 : 10;
      const number = parseInt(entity.replace(/^#x?/i, ""), radix);
      return Number.isFinite(number) ? String.fromCharCode(number) : "";
    }

    return entities[entity] || "";
  });
}

function attr(source, name) {
  const match = source.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function zipEntry(buffer, entryName) {
  let eocd = -1;
  for (let index = buffer.length - 22; index >= 0; index -= 1) {
    if (buffer.readUInt32LE(index) === 0x06054b50) {
      eocd = index;
      break;
    }
  }
  if (eocd < 0) throw new Error("Invalid XLSX zip: central directory not found.");

  let offset = buffer.readUInt32LE(eocd + 16);
  const totalEntries = buffer.readUInt16LE(eocd + 10);

  for (let index = 0; index < totalEntries; index += 1) {
    if (buffer.readUInt32LE(offset) !== 0x02014b50) {
      throw new Error("Invalid XLSX zip: malformed central directory.");
    }

    const method = buffer.readUInt16LE(offset + 10);
    const compressedSize = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeaderOffset = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString("utf8", offset + 46, offset + 46 + nameLength);

    if (name === entryName) {
      const localNameLength = buffer.readUInt16LE(localHeaderOffset + 26);
      const localExtraLength = buffer.readUInt16LE(localHeaderOffset + 28);
      const start = localHeaderOffset + 30 + localNameLength + localExtraLength;
      const compressed = buffer.slice(start, start + compressedSize);

      if (method === 0) return compressed.toString("utf8");
      if (method === 8) return zlib.inflateRawSync(compressed).toString("utf8");
      throw new Error(`Unsupported zip compression method ${method}.`);
    }

    offset += 46 + nameLength + extraLength + commentLength;
  }

  return "";
}

function clean(value = "") {
  return String(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .trim();
}

function normalizeHeader(value) {
  return clean(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function colIndex(reference) {
  const letters = (reference.match(/[A-Z]+/i) || [""])[0].toUpperCase();
  let index = 0;
  for (const letter of letters) index = index * 26 + letter.charCodeAt(0) - 64;
  return index - 1;
}

function sharedStrings(xml) {
  return Array.from(xml.matchAll(/<si[^>]*>([\s\S]*?)<\/si>/g)).map((match) =>
    Array.from(match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g))
      .map((textMatch) => decodeXml(textMatch[1]))
      .join("")
  );
}

function cellValue(attributes, body, shared) {
  const type = attr(attributes, "t");
  if (type === "inlineStr") {
    return clean(
      Array.from(body.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g))
        .map((match) => decodeXml(match[1]))
        .join("")
    );
  }

  const valueMatch = body.match(/<v[^>]*>([\s\S]*?)<\/v>/);
  if (!valueMatch) return "";
  const raw = decodeXml(valueMatch[1]);
  return type === "s" ? clean(shared[Number(raw)] || "") : clean(raw);
}

function excelDate(value) {
  const serial = Number(value);
  if (!Number.isFinite(serial) || serial < 30000) return clean(value);
  return new Date(Date.UTC(1899, 11, 30) + serial * 86400000).toISOString().slice(0, 10);
}

function sheetRecords(sheetXml, shared) {
  const rows = Array.from(sheetXml.matchAll(/<row\b([^>]*)>([\s\S]*?)<\/row>/g)).map((rowMatch) => {
    const cells = [];
    for (const cellMatch of rowMatch[2].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)) {
      cells[colIndex(attr(cellMatch[1], "r"))] = cellValue(cellMatch[1], cellMatch[2], shared);
    }
    return cells;
  });

  const headers = (rows.shift() || []).map(normalizeHeader);
  return rows
    .map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        if (header) record[header] = clean(row[index] || "");
      });
      return record;
    })
    .filter((record) => Object.values(record).some(Boolean));
}

function findWorkbook(root, candidateNames) {
  return candidateNames.map((fileName) => path.join(root, fileName)).find((filePath) => fs.existsSync(filePath));
}

function readWorkbookRecords(workbookPath) {
  const workbook = fs.readFileSync(workbookPath);
  const shared = sharedStrings(zipEntry(workbook, "xl/sharedStrings.xml"));
  return sheetRecords(zipEntry(workbook, "xl/worksheets/sheet1.xml"), shared);
}

module.exports = {
  clean,
  excelDate,
  findWorkbook,
  readWorkbookRecords
};
