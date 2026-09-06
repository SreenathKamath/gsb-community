import fallbackLogo from "../assets/images/lord123.png";
import { generatedOrganizations } from "./generatedOrganizations";
import { organizationLogos } from "./organizationLogos";
import { splitNumberedList, isPlaceholderValue } from "./lib/textLists";

const legacyOrganizationDetails = {
  "6": {
    name: "Sevanam Karanakodam",
    shortDescription: "Service-driven community initiative of Karnakodam.",
    founded: "2025",
    description:
      "Sevanam Karnakodam is a community-oriented organization focused on service, compassion, and social responsibility. Rooted in the values of selfless service, the organization actively supports cultural, spiritual, and welfare activities that strengthen community bonds and promote collective well-being.",
    highlights: [
      "Community service and welfare programs",
      "Supporting religious and cultural events",
      "Assisting families and individuals in need",
      "Encouraging volunteerism and social responsibility"
    ],
    members: [
      { name: "Sreekanth G Bhat", role: "President" },
      { name: "Rohith Pai", role: "Vice-President" }
    ]
  },
  "7": {
    name: "FC Karnakod",
    shortDescription: "Karnakod's united football community.",
    founded: "2015",
    description:
      "FC Karnakod is a grassroots football community founded to unite local youth through the love of the game. Beyond competition, the club emphasizes discipline, teamwork, and sportsmanship while actively training players and representing Karnakod in tournaments.",
    highlights: [
      "Winners of the TD Cup Football Tournament",
      "Organized inter-community football matches",
      "Actively training and mentoring young local players"
    ],
    members: [
      { name: "Pramod R Pai", role: "Captain" },
      { name: "Ramanand", role: "Vice-captain" }
    ]
  },
  "8": {
    name: "Sree Venkiteshwara Seva Samithy",
    shortDescription: "A spiritual and cultural GSB community rooted in tradition.",
    founded: "1992",
    description:
      "Sree Venkiteshwara Seva Samithy is a spiritually rooted community organization dedicated to preserving GSB temple traditions, religious practices, and cultural heritage.",
    highlights: [
      "Annual temple festivals and rituals conducted with community participation",
      "Organized cultural programs and religious discourses",
      "Active involvement in social welfare and community services"
    ],
    members: [
      { name: "Anand Kamath", role: "President" },
      { name: "Dhanesh Rao", role: "Treasurer" }
    ]
  }
};

const generatedById = generatedOrganizations.reduce((records, organization) => {
  if (organization.orgId) {
    records[organization.orgId] = organization;
  }

  return records;
}, {});

const organizationIds = Array.from(
  new Set([
    ...generatedOrganizations.map((organization) => organization.orgId).filter(Boolean),
    ...Object.keys(organizationLogos),
    ...Object.keys(legacyOrganizationDetails)
  ])
).sort((first, second) => Number(first) - Number(second));

function buildMembers(boardMembersRaw, memberDescriptionRaw, fallbackMembers = []) {
  const names = splitNumberedList(boardMembersRaw);
  const roles = splitNumberedList(memberDescriptionRaw);

  if (!names.length) {
    return fallbackMembers;
  }

  // Roles are matched to names by their shared position in the two numbered
  // lists, so pair them up before dropping anything - filtering names first
  // would shift that alignment and mismatch every entry after the drop.
  const fallbackRole = !isPlaceholderValue(roles[0]) ? roles[0] : "Committee Member";
  const members = names
    .map((name, index) => ({
      name,
      role: !isPlaceholderValue(roles[index]) ? roles[index] : fallbackRole
    }))
    .filter((member) => !isPlaceholderValue(member.name));

  return members.length ? members : fallbackMembers;
}

function combineDescriptionAndPurpose(description, purpose) {
  const cleanDescription = String(description || "").trim();
  const cleanPurpose = String(purpose || "").trim();

  if (!cleanPurpose) return cleanDescription;
  if (!cleanDescription) return cleanPurpose;

  // Compare case-insensitively so "To promote..." vs "to promote..." (a
  // common Excel authoring inconsistency) is recognized as the same text
  // instead of being appended twice.
  const normalizedDescription = cleanDescription.toLowerCase();
  const normalizedPurpose = cleanPurpose.toLowerCase();
  if (normalizedDescription.includes(normalizedPurpose) || normalizedPurpose.includes(normalizedDescription)) {
    return cleanDescription.length >= cleanPurpose.length ? cleanDescription : cleanPurpose;
  }

  return `${cleanDescription} ${cleanPurpose}`;
}

function buildHighlights(organization, fallbackHighlights = []) {
  const highlights = [];

  if (organization.organizationPurpose) {
    highlights.push(`Purpose: ${organization.organizationPurpose}`);
  }

  if (organization.registration) {
    highlights.push(`Registration: ${organization.registration}`);
  }

  if (organization.location) {
    highlights.push(`Location: ${organization.location}`);
  }

  return highlights.length ? highlights : fallbackHighlights;
}

function buildCommunity(orgId) {
  const generated = generatedById[orgId];
  const legacy = legacyOrganizationDetails[orgId] || {};
  const name = generated?.name || legacy.name || `Community Organization ${orgId}`;
  const description = generated?.description || legacy.description || "Organization details are being collected.";
  const purpose = generated?.organizationPurpose;
  const shortDescription =
    generated?.description || legacy.shortDescription || "Community organization details are being collected.";

  return {
    id: orgId,
    orgId,
    name,
    logo: organizationLogos[orgId] || fallbackLogo,
    shortDescription,
    founded: generated?.foundedOn || legacy.founded || "To be updated",
    description: combineDescriptionAndPurpose(description, purpose),
    registration: generated?.registration || "",
    location: generated?.location || "",
    officialContactPhone: generated?.officialContactPhone || "",
    officialEmail: generated?.officialEmail || "",
    organizationPurpose: purpose || "",
    highlights: buildHighlights(generated || {}, legacy.highlights),
    members: buildMembers(generated?.boardMembersRaw, generated?.memberDescriptionRaw, legacy.members),
    detailsStatus: generated ? "complete" : "in-progress"
  };
}

export const communities = organizationIds.map(buildCommunity);
