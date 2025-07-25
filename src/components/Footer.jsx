// src/components/Footer.jsx - Versión Simplificada
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/Footer.css';

const Footer = ({ 
  brandName = "PokéDex", 
  year = new Date().getFullYear(),
  developer = "Tu Nombre",
  university = "Universidad/Instituto"
}) => {
  // Enlaces sociales
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com', 
      icon: '🐙',
      hoverColor: '#24292e'
    },
    { 
      name: 'LinkedIn', 
      url: 'https://linkedin.com', 
      icon: '💼',
      hoverColor: '#005885'
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com', 
      icon: '🐦',
      hoverColor: '#0d8bd9'
    },
    { 
      name: 'Discord', 
      url: 'https://discord.com', 
      icon: '🎮',
      hoverColor: '#5b6eae'
    }
  ];

  // Enlaces rápidos
  const quickLinks = [
    { name: 'Inicio', href: '/', icon: '🏠' },
    { name: 'Pokédex', href: '/gallery', icon: '📚' },
    { name: 'Contacto', href: '/contact', icon: '📧' }
  ];

  // Información técnica
  const techInfo = [
    { label: 'React', value: '18+', icon: '⚛️' },
    { label: 'Vite', value: '4.0', icon: '⚡' },
    { label: 'Router', value: 'v6', icon: '🛣️' },
    { label: 'API', value: 'PokéAPI', icon: '🔌' }
  ];

  // Scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer-enhanced">
      {/* Scroll to Top Button */}
      <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
        <span className="scroll-icon">🚀</span>
      </button>

      <div className="footer-container-enhanced">
        {/* Main Content */}
        <div className="footer-main">
          <div className="footer-grid">
            
            {/* Brand Section */}
            <div className="footer-section brand-section">
              <div className="footer-brand-enhanced">
                <div className="brand-logo-enhanced">
                  <span className="brand-icon-large">⚡</span>
                  <div className="brand-info">
                    <h3 className="brand-name-enhanced">{brandName}</h3>
                    <p className="brand-tagline">Tu compañero digital Pokémon</p>
                  </div>
                </div>
                
                <p className="brand-description-enhanced">
                  Explora el fascinante mundo Pokémon con nuestra Pokédex interactiva. 
                  Descubre estadísticas, evoluciones, habilidades y mucho más sobre 
                  tus Pokémon favoritos.
                </p>

                {/* Social Links */}
                <div className="social-section">
                  <h4 className="social-title">Síguenos</h4>
                  <div className="social-links-enhanced">
                    {socialLinks.map((link, index) => (
                      <a 
                        key={index}
                        href={link.url} 
                        className="social-link-enhanced"
                        target="_blank"
                        rel="noopener noreferrer"
                        title={link.name}
                        style={{'--hover-color': link.hoverColor}}
                      >
                        <span className="social-icon-enhanced">{link.icon}</span>
                        <span className="social-tooltip">{link.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section links-section">
              <h4 className="section-title">
                <span className="section-icon">🚀</span>
                Enlaces Rápidos
              </h4>
              <ul className="footer-links-enhanced">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link to={link.href} className="footer-link-enhanced">
                      <span className="link-icon">{link.icon}</span>
                      <span className="link-text">{link.name}</span>
                      <span className="link-arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Info */}
            <div className="footer-section tech-section">
              <h4 className="section-title">
                <span className="section-icon">⚙️</span>
                Tecnologías
              </h4>
              <div className="tech-stack">
                {techInfo.map((tech, index) => (
                  <div key={index} className="tech-item">
                    <span className="tech-icon">{tech.icon}</span>
                    <div className="tech-details">
                      <span className="tech-name">{tech.label}</span>
                      <span className="tech-version">{tech.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom-enhanced">
          <div className="footer-bottom-content">
            <div className="copyright-section">
              <p className="copyright-text">
                © {year} {brandName}. Todos los derechos reservados.
              </p>
              <p className="pokemon-copyright">
                Pokémon © Nintendo/Game Freak/Creatures Inc.
              </p>
            </div>
            
            <div className="footer-meta">
              <div className="meta-item">
                <span className="meta-icon">🌐</span>
                <span className="meta-text">Hecho con ❤️ en React</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon">🔄</span>
                <span className="meta-text">Última actualización: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {/* Bottom Animation */}
          <div className="footer-wave">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  brandName: PropTypes.string,
  year: PropTypes.number,
  developer: PropTypes.string,
  university: PropTypes.string
};

export default Footer;