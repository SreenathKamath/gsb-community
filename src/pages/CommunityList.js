import React from "react";
import { communities } from "../data/communities";
import CommunityCard from "../components/CommunityCard";
import "./community.css";

const CommunityList = () => {
  return (
    <div className="community-list-page">

      {/* HERO HEADER */}
      <div className="community-list-hero">
        <h1>Our Communities</h1>
        <p>
          Preserving culture, tradition, and unity through our vibrant GSB
          organizations.
        </p>
      </div>

      {/* GRID */}
      <div className="community-grid">
        {communities.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
      </div>

    </div>
  );
};

export default CommunityList;
