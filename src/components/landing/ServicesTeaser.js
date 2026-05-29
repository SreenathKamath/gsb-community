import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaBriefcase, FaCamera, FaStethoscope, FaUtensils } from "react-icons/fa";

const serviceHighlights = [
  { label: "Doctors", icon: FaStethoscope },
  { label: "Businesses", icon: FaBriefcase },
  { label: "Photography", icon: FaCamera },
  { label: "Catering", icon: FaUtensils }
];

const ServicesTeaser = () => (
  <section className="services-teaser-section">
    <div className="section-container services-teaser-layout">
      <motion.div
        className="services-teaser-copy"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
      >
        <p className="section-eyebrow">Community Connect</p>
        <h2>Find trusted people and services from within Karnakod.</h2>
        <p>
          A dedicated directory for doctors, businesses, photographers, food caterers, wedding planners, and essential
          service contacts.
        </p>
        <Link className="text-link-action" to="/services">
          Open service directory <FaArrowRight />
        </Link>
      </motion.div>

      <div className="services-teaser-grid">
        {serviceHighlights.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              className="services-teaser-chip"
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
            >
              <Icon />
              <span>{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default ServicesTeaser;
