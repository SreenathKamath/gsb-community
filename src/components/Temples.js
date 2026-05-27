import React from 'react';
import { motion } from 'framer-motion';
import { GiTempleGate, GiIncense, GiLotus, GiFireBowl, GiCandleFlame } from 'react-icons/gi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { temples } from "../data/temples";
import SectionHeader from './landing/SectionHeader';

const Temples = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  const navigate = useNavigate();
  const getTempleIcon = (slug) => {
    switch (slug) {
      case "thirumala-devaswom":
        return <GiTempleGate />;
      case "svb-devi":
        return <GiIncense />;
      case "shivalayam":
        return <GiLotus />;
      case "Muthi-Bhagavathy-Temple":
        return <GiFireBowl />;
      case "Shri-Sidhivinayak-Mandir":
        return <GiIncense />;
      default:
        return <GiCandleFlame />;
    }
  };


  return (
    <section className="temples-section">
      <div className="section-container">
        <SectionHeader eyebrow="Temple Directory" title="Our Sacred Temples">
          Explore the shrines, poojas, priests, and observances that anchor the spiritual rhythm of Karanakodam.
        </SectionHeader>
        <motion.div 
          className="temples-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {temples.map((temple) => (
            <motion.div 
              key={temple.id} 
              className="temple-card"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() => navigate(`/temples/${temple.id}-${temple.slug}`)}
            >
              <div className="temple-image">
              <div className="temple-icon">
                {getTempleIcon(temple.slug)}
              </div>
              </div>
              <div className="temple-info">
                <h3 className="temple-name">{temple.name}</h3>
                <p className="temple-location">
                  <FaMapMarkerAlt /> {temple.location}
                </p>
                <span className="temple-card-action">View temple details</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Temples;
