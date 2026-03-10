import React from "react";
import { useParams } from "react-router-dom";
import { temples } from "../data/temples";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./temple.css";

const TempleDetail = () => {
  const { id } = useParams();

  // extract numeric id before "-"
  const numericId = parseInt(id.split("-")[0]);

  const temple = temples.find((t) => t.id === numericId);

  if (!temple) {
    return (
      <>
        <Navbar />
        <div style={{ padding: "160px 8%" }}>
          <h2>Temple not found</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="temple-hero">
        <div className="temple-hero-overlay">
          <h1>{temple.name}</h1>
          <p>{temple.location}</p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="temple-detail-page">

        {/* Description */}
        <div className="temple-card">
          <h2>About the Temple</h2>
          <p>{temple.description}</p>
        </div>

        {/* Priests */}
        <div className="temple-card">
          <h2>Pandits / Priests</h2>
          <div className="temple-grid">
            {temple.priests.map((p, i) => (
              <div key={i} className="mini-card">
                {p}
              </div>
            ))}
          </div>
        </div>

        {/* Poojas */}
        <div className="temple-card">
          <h2>Special Poojas</h2>
          <div className="temple-grid">
            {temple.poojas.map((pooja, i) => (
              <div key={i} className="mini-card">
                {pooja}
              </div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
    </>
  );
};

export default TempleDetail;
