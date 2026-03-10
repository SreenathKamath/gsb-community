import React from "react";
import { useParams } from "react-router-dom";
import { communities } from "../data/communities";

const CommunityDetail = () => {
  const { id } = useParams();

  const community = communities.find((c) => c.id === id);
  if (!community) {
    return (
      <div style={{ padding: "160px 8%" }}>
        <h2>Community not found</h2>
        <p>Please check the link or go back.</p>
      </div>
    );
  }

  return (
    <div className="community-detail-page">

      {/* HEADER / HERO */}
      <div className="community-hero">
        <div className="community-hero-logo">
          <img src={community.logo} alt={community.name} />
        </div>

        <h1 className="community-hero-title">{community.name}</h1>
        <p className="community-hero-founded">
          Established in {community.founded}
        </p>
      </div>
    
      {/* DESCRIPTION */}
      <div className="community-detail-card">
        <h2>About the Community</h2>
        <p>{community.description}</p>
      </div>

      {/* MEMBERS */}
      <div className="community-detail-card">
        <h2>Members & Leadership</h2>

        <div className="members-grid">
          {community.members.map((member, index) => (
            <div key={index} className="member-card">
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
      {/* HIGHLIGHTS / RECENT ACTIVITIES */}
      {community.highlights && (
        <div className="community-detail-card">
          <h2>Recent Activities & Achievements</h2>
          <ul className="community-highlights">
            {community.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CommunityDetail;
