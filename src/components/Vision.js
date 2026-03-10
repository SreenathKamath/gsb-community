import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaBullseye } from 'react-icons/fa';

const Vision = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="vision" className="vision-section">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Vision & Mission
        </motion.h2>
        <motion.div 
          className="vision-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="vision-card" variants={itemVariants}>
            <div className="vision-icon"><FaEye /></div>
            <h3>Vision</h3>
            <p>
              To unite the entire GSB community of Karanakodam under one platform, 
              strengthening cultural, social, and spiritual bonds.
            </p>
          </motion.div>
          <motion.div className="vision-card" variants={itemVariants}>
            <div className="vision-icon"><FaBullseye /></div>
            <h3>Mission</h3>
            <p>
              Provide a common digital and physical platform to share news, celebrate culture, 
              and encourage participation in rituals, sports, arts, and social service.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
