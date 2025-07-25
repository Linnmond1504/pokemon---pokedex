
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Navbar.css';

const Navbar = ({ brandName = "PokéDex" }) => {
  const location = useLocation();
  
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const isActive = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 
  const navLinks = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/gallery', label: 'Pokédex', icon: '📚' },
    { path: '/contact', label: 'Contacto', icon: '📧' }
  ];

  return (
    <nav className={`navbar-enhanced ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand */}
        <Link className="navbar-brand-enhanced" to="/">
          <div className="brand-content">
            <span className="brand-icon-enhanced">⚡</span>
            <span className="brand-text">{brandName}</span>
          </div>
          <div className="brand-subtitle">Gotta Catch 'Em All!</div>
        </Link>

        
        <div className="scroll-progress">
          <div 
            className="scroll-progress-bar"
            style={{
              width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
            }}
          ></div>
        </div>

       
        <div className="navbar-nav-desktop">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              className={isActive(link.path)}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
              <div className="nav-indicator"></div>
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>

      
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <span className="mobile-brand">
                <span className="brand-icon-enhanced">⚡</span>
                {brandName}
              </span>
            </div>
            
            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">{link.icon}</span>
                  <span className="mobile-nav-text">{link.label}</span>
                  <span className="mobile-nav-arrow">→</span>
                </Link>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <p>Explora el mundo Pokémon</p>
            </div>
          </div>
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  brandName: PropTypes.string
};

export default Navbar;