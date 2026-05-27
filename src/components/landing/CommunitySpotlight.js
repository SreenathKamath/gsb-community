import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { communities } from "../../data/communities";
import SectionHeader from "./SectionHeader";

const CommunitySpotlight = () => {
  const featured = communities.slice(0, 5);

  return (
    <section className="community-spotlight-section">
      <div className="section-container">
        <SectionHeader eyebrow="Community Network" title="One Karnakod, Many Living Traditions">
          Spiritual service, youth initiatives, sports, welfare, and cultural groups are brought together in one
          connected community platform.
        </SectionHeader>

        <div className="community-showcase">
          {featured.map((community, index) => (
            <motion.article
              className="community-showcase-card"
              key={community.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: index * 0.06, duration: 0.45 }}
            >
              <img src={community.logo} alt={`${community.name} logo`} />
              <div>
                <p>{community.founded}</p>
                <h3>{community.name}</h3>
                <span>{community.shortDescription}</span>
              </div>
            </motion.article>
          ))}
        </div>

        <Link className="text-link-action" to="/community">
          View all communities <FaArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default CommunitySpotlight;
