import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { GiDrum, GiTempleGate, GiSoccerBall, GiTheaterCurtains, GiSun } from 'react-icons/gi';

const Events = () => {
  const events = [
      {
      id: 1,
      title: "Holi Utsav",
      description:
        "A joyful celebration of Holi featuring traditional rituals, colors, music, and community togetherness.",
      date: { day: "08", month: "MAR" },
      time: "3:00 PM",
      location: "Anugraha Charitable Trust, Karanakodam",
      icon: <GiSun />
    },
      {
        id: 2,
        title: "Pragathi Cup 2026",
        description: "All India GSB foorball league-2026",
        date: { day: "03", month: "April" },
        time: "9:00 AM",
        location: "Redkite, Vytilla",
        icon: <GiSoccerBall />
      },
      {
        id: 3,
        title: "Sree Narayana Devar Aarattu-2026",
        description: "Sree Narayana Devar Aarattu 2026-Karnakod",
        date: { day: "27", month: "June" },
        time: "6:30 PM",
        location: "TD Temple, Karanakodam",
        icon: <GiTheaterCurtains />
      },
      {
        id: 4,
        title: "Mandalam Mahotsav",
        description: "Mandala Maasacharanam",
        date: { day: "27", month: "DEC" },
        time: "7:00 PM",
        location: "SVB Devi temple, KDM",
        icon: <GiDrum />
      }
    ];

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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="events-section">
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Events
        </motion.h2>
        <motion.div 
          className="events-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {events.map((event) => (
            <motion.div 
              key={event.id} 
              className="event-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="event-image">
                <div className="event-icon">{event.icon}</div>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
