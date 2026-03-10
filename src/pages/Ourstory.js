import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';
import { GiIndianPalace } from 'react-icons/gi';

const OurStory = () => {
  return (
    <div>
      <Navbar />
      <section className="story-section">
        <div className="story-background"></div>
        <div className="story-container">
          <Link to="/" className="back-button">
            <FaArrowLeft /> Back to Home
          </Link>
          
          <motion.div 
            className="story-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="story-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <GiIndianPalace />
            </motion.div>

            <motion.h1 
              className="story-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              About the Logo of Amgelle Karnakod
            </motion.h1>

            <motion.div 
              className="story-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p>
                This logo beautifully represents our <strong>Gramadev, Sri Narayana Dever</strong>, 
                who is the divine protector and guiding force of our area. Lord Narayana Dever is 
                adorned with sacred chains and kavacham (armor) that have been lovingly offered by 
                the devotees (bhaktas) of Karnakodam as symbols of their faith and devotion.
              </p>

              <p>
                At the top, you can see <strong>Tulasi (holy basil)</strong>, the most revered offering 
                to Lord Narayana, signifying purity and devotion. The divine image of the Lord, surrounded 
                by garlands and lamps, radiates blessings and spiritual strength for the wellbeing of our 
                community.
              </p>

              <p>
                The name <strong>"Amgelle Karnakod"</strong> itself means <em>"Our Karnakod"</em>, reflecting 
                the deep connection and pride we share for our sacred land and people.
              </p>

              <p>
                The caption, <strong>"The Spirit of GSB Community"</strong>, represents the unity, culture, 
                and devotion of the Goud Saraswat Brahmin (GSB) community — always standing together with 
                faith, pride, and harmony.
              </p>
            </motion.div>

            <motion.div 
              className="story-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Link to="/" className="story-cta">Explore Our Community</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OurStory;