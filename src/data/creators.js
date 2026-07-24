import fallbackImage from "../assets/images/lord123.png";
import { generatedCreators } from "./generatedCreators";
import { creatorImages } from "./creatorImages";

export const creators = generatedCreators
  .filter((creator) => creator.creatorId)
  .sort((first, second) => Number(first.creatorId) - Number(second.creatorId))
  .map((creator) => ({
    id: creator.creatorId,
    name: creator.name,
    role: creator.role,
    organization: creator.organization,
    bio: creator.bio,
    image: creatorImages[creator.creatorId] || fallbackImage,
    phone: creator.phone,
    email: creator.email
  }));
