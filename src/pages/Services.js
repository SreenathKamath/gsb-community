import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaBriefcase,
  FaCalendarCheck,
  FaCamera,
  FaCheckCircle,
  FaEnvelope,
  FaFilter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSearch,
  FaStar,
  FaStethoscope,
  FaStore,
  FaUtensils
} from "react-icons/fa";
import { communityServices, serviceCategories } from "../data/communityServices";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const categoryIcons = {
  health: FaStethoscope,
  business: FaStore,
  photography: FaCamera,
  catering: FaUtensils,
  events: FaCalendarCheck,
  essentials: FaBriefcase
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const visibleServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return communityServices.filter((service) => {
      const matchesCategory = activeCategory === "all" || service.category === activeCategory;
      const searchableText = [
        service.name,
        service.type,
        service.summary,
        service.location,
        ...service.services
      ].join(" ").toLowerCase();

      return matchesCategory && (!query || searchableText.includes(query));
    });
  }, [activeCategory, searchTerm]);

  const featuredCount = communityServices.filter((service) => service.featured).length;

  return (
    <div>
      <Navbar />
      <main className="services-page">
        <section className="services-hero">
          <motion.div
            className="services-hero-content"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="section-eyebrow">Community Connect</p>
            <h1>Trusted Services Within Our Community</h1>
            <p>
              A practical directory for doctors, businesses, photographers, caterers, event managers, and essentials
              connected to United Karnakod.
            </p>
          </motion.div>

          <motion.div
            className="services-hero-panel"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: "easeOut" }}
          >
            <div>
              <span>{communityServices.length}</span>
              <p>Service groups ready for verified listings</p>
            </div>
            <div>
              <span>{serviceCategories.length - 1}</span>
              <p>Categories for future expansion</p>
            </div>
            <div>
              <span>{featuredCount}</span>
              <p>Priority areas for first data collection</p>
            </div>
          </motion.div>
        </section>

        <section className="services-directory">
          <div className="services-toolbar">
            <div className="services-search">
              <FaSearch />
              <input
                type="search"
                placeholder="Search doctors, catering, photography, essentials..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="services-filter-label">
              <FaFilter />
              <span>Filter by category</span>
            </div>
          </div>

          <div className="services-category-tabs" aria-label="Service categories">
            {serviceCategories.map((category) => (
              <button
                className={activeCategory === category.id ? "active" : ""}
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <motion.div className="services-grid" layout>
            {visibleServices.map((service, index) => {
              const Icon = categoryIcons[service.category] || FaBriefcase;

              return (
                <motion.article
                  className="service-card"
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35 }}
                >
                  <div className="service-card-top">
                    <div className="service-icon">
                      <Icon />
                    </div>
                    <div className="service-badges">
                      {service.featured && (
                        <span className="service-badge featured">
                          <FaStar /> Priority
                        </span>
                      )}
                      <span className={`service-badge ${service.verified ? "verified" : "pending"}`}>
                        <FaCheckCircle /> {service.verified ? "Verified" : "Collecting details"}
                      </span>
                    </div>
                  </div>

                  <p className="service-type">{service.type}</p>
                  <h2>{service.name}</h2>
                  <p className="service-summary">{service.summary}</p>

                  <div className="service-list">
                    {service.services.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>

                  <div className="service-meta">
                    <p>
                      <FaMapMarkerAlt /> {service.location}
                    </p>
                    <p>
                      <FaCalendarCheck /> {service.availability}
                    </p>
                  </div>

                  <div className="service-contact">
                    <a href={service.contact.phone === "To be updated" ? "/contact" : `tel:${service.contact.phone}`}>
                      <FaPhoneAlt /> {service.contact.phone}
                    </a>
                    <a href={service.contact.email === "To be updated" ? "/contact" : `mailto:${service.contact.email}`}>
                      <FaEnvelope /> {service.contact.email}
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {visibleServices.length === 0 && (
            <div className="services-empty">
              <h2>No matching services found</h2>
              <p>Try another category or search term.</p>
            </div>
          )}
        </section>

        <section className="services-submit-band">
          <div>
            <p className="section-eyebrow">Grow The Directory</p>
            <h2>Add a trusted community service</h2>
            <p>
              The data structure is ready for doctors, businesses, photographers, caterers, wedding teams, and essential
              contacts. New entries can be added in one file and will appear automatically.
            </p>
          </div>
          <a href="/contact">
            Submit details <FaArrowRight />
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
