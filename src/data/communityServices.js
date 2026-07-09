import { generatedServices } from "./generatedServices";
import { parseBoolean, splitNumberedList } from "./lib/textLists";

export const serviceCategories = [
  { id: "all", label: "All Services" },
  { id: "health", label: "Doctors & Health" },
  { id: "business", label: "Businesses" },
  { id: "photography", label: "Photographers" },
  { id: "catering", label: "Food & Catering" },
  { id: "events", label: "Wedding & Events" },
  { id: "essentials", label: "Essentials" }
];

function buildService(record) {
  return {
    id: record.serviceId || record.name,
    name: record.name,
    category: record.category,
    type: record.type,
    summary: record.summary,
    services: splitNumberedList(record.servicesRaw),
    location: record.location,
    availability: record.availability,
    contact: {
      phone: record.contactPhone || "To be updated",
      email: record.contactEmail || "To be updated"
    },
    featured: parseBoolean(record.featuredRaw),
    verified: parseBoolean(record.verifiedRaw)
  };
}

export const communityServices = generatedServices.filter((record) => record.name).map(buildService);
