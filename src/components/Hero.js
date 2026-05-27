import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import heroImage from '../assets/images/lord.png';
import accentImage from '../assets/images/lord123.png';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="hero-pattern" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.p
          className="hero-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          The Spirit of GSB Karanakodam
        </motion.p>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          UNITED KARNAKOD
        </motion.h1>
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          One Community | One Voice | One Karnakod
        </motion.p>
        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <motion.a className="cta-button" href="/our-story" whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
            Explore Our Community <FaArrowRight />
          </motion.a>
          <motion.a className="cta-button cta-button-ghost" href="#vision" whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}>
            Vision & Mission
          </motion.a>
        </motion.div>
      </motion.div>
      <motion.aside
        className="hero-devotional-card"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <img src={accentImage} alt="United Karnakod devotional artwork" />
        <div>
          <span>Heritage Platform</span>
          <strong>Temples, events, news, and community groups in one place.</strong>
        </div>
      </motion.aside>
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <FaChevronDown />
      </motion.div>
    </section>
  );
};

export default Hero;
