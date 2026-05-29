import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Vision from '../components/Vision';
import NewsTicker from '../components/NewsTicker';
import Events from '../components/Events';
import Temples from '../components/Temples';
import CommunitySpotlight from '../components/landing/CommunitySpotlight';
import ServicesTeaser from '../components/landing/ServicesTeaser';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Vision />
      <NewsTicker />
      <CommunitySpotlight />
      <ServicesTeaser />
      <Events />
      <Temples />
      <Footer />
    </div>
  );
};

export default Home;
