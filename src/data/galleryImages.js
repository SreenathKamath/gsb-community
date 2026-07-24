const galleryContext = require.context(
  "../assets/images/gallery",
  false,
  /\.(png|jpe?g|gif|webp|avif|svg)$/i
);

// Map a filename prefix (the part before the first underscore, e.g. "NDA26")
// to a friendly event title. Add an entry here whenever a new event's photos
// are dropped into src/assets/images/gallery — everything else (grouping,
// sorting, image format) is handled automatically.
const EVENT_DETAILS = {
  NDA26: {
    title: "Sree Narayana Devar Aarattu 2026",
    subtitle: "Annual Aarattu Celebrations"
  }
};

function humanizeCode(code) {
  const match = code.match(/^([A-Za-z]+)(\d+)$/);
  if (!match) {
    return code;
  }

  const [, letters, digits] = match;
  const year = digits.length === 2 ? `20${digits}` : digits;
  return `${letters} ${year}`;
}

function parseFileName(fileName) {
  const baseName = fileName.replace(/^\.\//, "").replace(/\.[^./]+$/, "");
  const [code, ...rest] = baseName.split("_");
  return {
    code: code || "General",
    sequence: rest.join("_") || baseName
  };
}

function buildGalleryCollections() {
  const groups = new Map();

  galleryContext.keys().forEach((key) => {
    const fileName = key.replace(/^\.\//, "");
    const { code, sequence } = parseFileName(fileName);

    if (!groups.has(code)) {
      groups.set(code, []);
    }

    groups.get(code).push({
      src: galleryContext(key),
      fileName,
      sequence
    });
  });

  return Array.from(groups.entries())
    .map(([code, images]) => {
      const details = EVENT_DETAILS[code];

      images.sort((a, b) => a.sequence.localeCompare(b.sequence, undefined, { numeric: true }));

      return {
        code,
        title: (details && details.title) || humanizeCode(code),
        subtitle: (details && details.subtitle) || "Community Event",
        images
      };
    })
    .sort((a, b) => b.code.localeCompare(a.code, undefined, { numeric: true }));
}

export const galleryCollections = buildGalleryCollections();
