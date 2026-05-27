import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaHandsHelping, FaOm } from 'react-icons/fa';
import SectionHeader from './landing/SectionHeader';

const Vision = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section id="vision" className="vision-section">
      <div className="section-container">
        <SectionHeader eyebrow="Purpose" title="Our Vision & Mission">
          United Karnakod keeps heritage visible, participation simple, and every community effort connected.
        </SectionHeader>
        <motion.div
          className="vision-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="vision-card" variants={itemVariants}>
            <div className="vision-icon"><FaOm /></div>
            <h3>Vision</h3>
            <p>
              To unite the entire GSB community of Karanakodam under one platform, strengthening cultural, social,
              and spiritual bonds.
            </p>
          </motion.div>
          <motion.div className="vision-card" variants={itemVariants}>
            <div className="vision-icon"><FaBullseye /></div>
            <h3>Mission</h3>
            <p>
              Provide a common digital and physical platform to share news, celebrate culture, and encourage
              participation in rituals, sports, arts, and social service.
            </p>
          </motion.div>
          <motion.div className="vision-card vision-card-featured" variants={itemVariants}>
            <div className="vision-icon"><FaHandsHelping /></div>
            <h3>Participation</h3>
            <p>
              Make it easier for families, youth, elders, volunteers, and organizers to stay informed and contribute
              to the shared life of Karnakod.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
