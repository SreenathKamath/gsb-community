import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CommunityCard = ({ community }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="community-card"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/community/${community.id}`)}
    >
      <div className="community-logo-wrapper">
        <img
          src={community.logo}
          alt={community.name}
          className="community-logo"
        />
      </div>

      <h3 className="community-name">{community.name}</h3>

      <p className="community-desc">
        {community.shortDescription}
      </p>

      <span className="community-link">
        View Details →
      </span>
    </motion.div>
  );
};

export default CommunityCard;
