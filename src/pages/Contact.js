import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaEnvelope, FaLightbulb, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { creators } from "../data/creators";

const roleIcons = {
  "Founding Visionary": FaLightbulb,
  "Design & Development": FaCode
};

const Contact = () => {
  return (
    <div>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="section-eyebrow">We'd Love To Hear From You</p>
            <h1>Contact Us</h1>
            <p>
              Questions, ideas, or want to get involved with United Karnakod? Reach out to the community or connect
              directly with the people behind this platform.
            </p>
          </motion.div>
        </section>

        <motion.div
          className="contact-visit-band"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <p className="section-eyebrow">Visit Us</p>
            <h2>Venkatachalapathi Temple, Karnakodam</h2>
            <p>Drop by in person, or reach out for membership, volunteering, and event details.</p>
          </div>
          <a href="https://maps.app.goo.gl/Ciwnvh3MxhYSULER9" target="_blank" rel="noopener noreferrer">
            <FaMapMarkerAlt /> Get Directions
          </a>
        </motion.div>

        <section className="creators-section">
          <div className="section-container">
            <div className="section-heading">
              <p className="section-eyebrow">Behind United Karnakod</p>
              <h2 className="section-title">Meet The Creators</h2>
              <p className="section-intro">
                United Karnakod exists because two people believed in it — one who carried the idea, and one who
                brought it to life online.
              </p>
            </div>

            <div className="creators-grid">
              {creators.map((creator, index) => {
                const RoleIcon = roleIcons[creator.role] || FaLightbulb;

                return (
                  <motion.article
                    className="creator-card"
                    key={creator.id}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: index * 0.12, duration: 0.55, ease: "easeOut" }}
                  >
                    <div className="creator-photo-frame">
                      <img src={creator.image} alt={creator.name} loading="lazy" />
                      <span className="creator-role-badge">
                        <RoleIcon /> {creator.role}
                      </span>
                    </div>

                    <div className="creator-body">
                      <h3 className="creator-name">{creator.name}</h3>
                      <p className="creator-org">{creator.organization}</p>
                      <p className="creator-bio">{creator.bio}</p>

                      <div className="creator-contact">
                        <a href={`tel:${creator.phone}`}>
                          <FaPhoneAlt /> {creator.phone}
                        </a>
                        <a href={`mailto:${creator.email}`}>
                          <FaEnvelope /> {creator.email}
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
