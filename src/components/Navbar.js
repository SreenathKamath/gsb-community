import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiTempleGate } from 'react-icons/gi';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/community', label: 'Community' },
  { to: '/services', label: 'Services' },
  { to: '/events', label: 'Events' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const solidHeader = !isHome || scrolled || menuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <nav className={`navbar ${solidHeader ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <span className="navbar-accent" aria-hidden="true"></span>

      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <span className="logo-mark">
          <GiTempleGate />
        </span>
        <span className="logo-text">United Karnakod</span>
      </Link>

      <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle navigation" aria-expanded={menuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={isActive(item.to) ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="nav-cta-item">
          <Link to="/get-involved" className="nav-cta" onClick={() => setMenuOpen(false)}>
            Get Involved
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
