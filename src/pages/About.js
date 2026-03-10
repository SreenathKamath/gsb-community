import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./about.css";

const About = () => {
  return (
    <>
      <Navbar />

      <section className="about-page">

        {/* HERO */}
        <div className="about-hero">
          <h1>About GSB Karanakodam</h1>
          <p>
            Preserving culture, devotion, and unity across generations of the
            GSB community.
          </p>
        </div>

        {/* MAIN CONTENT */}
        <div className="about-container">

          <div className="about-card">
            <h2>Who We Are</h2>
            <p>
              GSB Karanakodam is a vibrant spiritual and cultural community
              devoted to preserving traditions, temple heritage, and social
              harmony among members. Through festivals, rituals, and service
              activities, the community continues to nurture faith and unity
              across generations.
            </p>
          </div>

          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              To protect and promote GSB culture, strengthen community bonds,
              support temples and traditions, and inspire younger generations
              to remain connected with their spiritual roots.
            </p>
          </div>

          <div className="about-card">
            <h2>Our Vision</h2>
            <p>
              To build a united, compassionate, and culturally strong community
              that carries forward the timeless values of devotion, service,
              and togetherness.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
