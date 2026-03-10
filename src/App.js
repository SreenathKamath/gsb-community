import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Community from './pages/Community';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import News from './pages/News';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import './index.css';
import OurStory from './pages/Ourstory';
import TempleDetail from "./pages/TempleDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/about" element={<About />} />
          <Route path="/community/*" element={<Community />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/temples/:id" element={<TempleDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
