import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import { events } from '../data/events';

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <section className="events-section page-events-section">
      <div className="section-container">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-eyebrow">Calendar</p>
          <h1 className="section-title">Upcoming Events</h1>
          <p className="section-intro">
            Festivals, sports meets, temple observances, and cultural gatherings from United Karnakod.
          </p>
        </motion.div>
        <motion.div
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.article
              key={event.id}
              className="event-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="event-image">
                <div className="event-category">{event.category}</div>
                <div className="event-icon">{React.createElement(event.icon)}</div>
                <div className="event-date">
                  <div className="event-date-day">{event.date.day}</div>
                  <div className="event-date-month">{event.date.month}</div>
                </div>
              </div>
              <div className="event-info">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                <div className="event-meta">
                  <div className="event-meta-item">
                    <FaClock /> {event.time}
                  </div>
                  <div className="event-meta-item">
                    <FaMapMarkerAlt /> {event.location}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
