const path = require("path");
const { clean, excelDate, excelTime } = require("./lib/xlsxReader");
const { syncWorkbook } = require("./lib/syncWorkbook");

const root = path.resolve(__dirname, "..");

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Add a new workbook -> generated-data-file pairing here. Each entry is independent:
// dropping the source file leaves the previously generated data untouched.
const SOURCES = [
  {
    key: "organizations",
    candidateNames: ["organization_details.xlsx", "organizations_details.xlsx"],
    outputPath: "src/data/generatedOrganizations.js",
    outputVarName: "generatedOrganizations",
    filter: (record) => record.org_id || record.name,
    map: (record) => ({
      orgId: clean(record.org_id),
      name: clean(record.name),
      description: clean(record.description),
      registration: clean(record.registration),
      location: clean(record.location),
      officialContactPhone: clean(record.offcial_contact_phone || record.official_contact_phone),
      officialEmail: clean(record.official_email),
      organizationPurpose: clean(record.organization_purpose),
      foundedOn: excelDate(record.founded_on),
      boardMembersRaw: clean(record.board_members),
      memberDescriptionRaw: clean(record.member_description)
    })
  },
  {
    key: "events",
    candidateNames: ["upcoming_events.xlsx", "events.xlsx"],
    outputPath: "src/data/generatedEvents.js",
    outputVarName: "generatedEvents",
    filter: (record) => record.event_id || record.title,
    map: (record) => ({
      eventId: clean(record.event_id),
      title: clean(record.title),
      description: clean(record.description),
      date: excelDate(record.date),
      time: excelTime(record.time),
      location: clean(record.location),
      category: clean(record.category)
    })
  },
  {
    key: "services",
    candidateNames: ["community_services.xlsx", "services.xlsx"],
    outputPath: "src/data/generatedServices.js",
    outputVarName: "generatedServices",
    filter: (record) => record.service_id || record.name,
    map: (record) => ({
      serviceId: clean(record.service_id),
      name: clean(record.name),
      category: clean(record.category),
      type: clean(record.type),
      summary: clean(record.summary),
      servicesRaw: clean(record.services),
      location: clean(record.location),
      availability: clean(record.availability),
      contactPhone: clean(record.contact_phone),
      contactEmail: clean(record.contact_email),
      featuredRaw: clean(record.featured),
      verifiedRaw: clean(record.verified)
    })
  },
  {
    key: "news",
    candidateNames: ["news.xlsx", "latest_news.xlsx"],
    outputPath: "src/data/generatedNews.js",
    outputVarName: "generatedNews",
    filter: (record) => record.news_item,
    map: (record) => clean(record.news_item)
  },
  {
    key: "temples",
    candidateNames: ["temples.xlsx", "sacred_places.xlsx"],
    outputPath: "src/data/generatedTemples.js",
    outputVarName: "generatedTemples",
    filter: (record) => record.temple_id || record.name,
    map: (record, index) => ({
      templeId: record.temple_id ? Number(record.temple_id) : index + 1,
      slug: clean(record.slug) || slugify(record.name),
      name: clean(record.name),
      location: clean(record.location),
      description: clean(record.description),
      priestsRaw: clean(record.priests),
      poojasRaw: clean(record.poojas)
    })
  },
  {
    key: "creators",
    candidateNames: ["creator_details.xlsx", "creators.xlsx"],
    outputPath: "src/data/generatedCreators.js",
    outputVarName: "generatedCreators",
    filter: (record) => record.creator_id || record.name,
    map: (record) => ({
      creatorId: clean(record.creator_id),
      name: clean(record.name),
      role: clean(record.role),
      organization: clean(record.organization),
      bio: clean(record.bio),
      phone: clean(record.phone),
      email: clean(record.email)
    })
  }
];

const requestedKey = process.argv[2];
const sourcesToRun = requestedKey ? SOURCES.filter((source) => source.key === requestedKey) : SOURCES;

if (requestedKey && sourcesToRun.length === 0) {
  console.error(`Unknown source "${requestedKey}". Available: ${SOURCES.map((s) => s.key).join(", ")}`);
  process.exit(1);
}

sourcesToRun.forEach((source) => syncWorkbook(root, source));
