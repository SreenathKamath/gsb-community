import { generatedTemples } from "./generatedTemples";
import { splitNumberedList } from "./lib/textLists";

function buildTemple(record) {
  return {
    id: record.templeId,
    slug: record.slug,
    name: record.name,
    location: record.location,
    description: record.description,
    priests: splitNumberedList(record.priestsRaw),
    poojas: splitNumberedList(record.poojasRaw)
  };
}

export const temples = generatedTemples.filter((record) => record.name).map(buildTemple);
