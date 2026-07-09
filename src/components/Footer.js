import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>GSB Karanakodam</h3>
          <p>Uniting our community through culture, tradition, and heritage.</p>
          <p style={{ marginTop: '1rem' }}>Preserving our rich GSB legacy for future generations.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/about">About Us</Link>
          <Link to="/community">Community Directory</Link>
          <Link to="/services">Community Services</Link>
          <Link to="/events">Events</Link>
          <Link to="/gallery">Gallery</Link>
        </div>
        <div className="footer-section">
          <h3>Get Involved</h3>
          <Link to="/get-involved">Membership</Link>
          <Link to="/get-involved">Volunteer</Link>
          <Link to="/get-involved">Donate</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem', marginTop: '1rem' }}>
            <a href="#" style={{ color: 'inherit' }}><FaFacebook /></a>
            <a href="#" style={{ color: 'inherit' }}><FaInstagram /></a>
            <a href="#" style={{ color: 'inherit' }}><FaTwitter /></a>
            <a
              href="https://youtube.com/@amgellekarnakod?si=FULp8WA0-Q8drpbp"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'inherit' }}
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-map-section">
        <div className="footer-map-info">
          <h3>Visit Us</h3>
          <p>Venkatachalapathi Temple, Karnakodam</p>
          <a
            href="https://maps.app.goo.gl/Ciwnvh3MxhYSULER9"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-map-directions"
          >
            <FaMapMarkerAlt /> Get Directions
          </a>
        </div>
        <div className="footer-map-embed">
          <iframe
            title="GSB Karanakodam location on Google Maps"
            src="https://www.google.com/maps?q=9.9872849,76.3045102&z=16&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 GSB Karanakodam Community. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
