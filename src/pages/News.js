import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const News = () => {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: '100vh', paddingTop: '120px', textAlign: 'center' }}>
        <h1>News & Updates</h1>
        <p>Coming Soon</p>
      </div>
      <Footer />
    </div>
  );
};

export default News;
