
import { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ 
  id, 
  name, 
  image, 
  types = [], 
  height = 0, 
  weight = 0,
  showDetails = true 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const formatName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const getTypeColor = (type) => {
    const typeColors = {
      fire: '#ff6b6b',
      water: '#4ecdc4',
      grass: '#95e1d3',
      electric: '#fce38a',
      psychic: '#f8b500',
      ice: '#a8e6cf',
      dragon: '#ff8b94',
      dark: '#6c5ce7',
      fairy: '#fd79a8',
      poison: '#6c5ce7',
      ground: '#fdcb6e',
      flying: '#74b9ff',
      bug: '#00b894',
      rock: '#636e72',
      ghost: '#a29bfe',
      steel: '#636e72',
      fighting: '#e17055',
      normal: '#ddd'
    };
    return typeColors[type] || '#ddd';
  };

  return (
    <div className={`pokemon-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-inner">
        {/* Frente de la tarjeta */}
        <div className="card-front">
          <div className="card-header">
            <span className="pokemon-id">#{String(id).padStart(3, '0')}</span>
          </div>
          
          <div className="pokemon-image-container">
            {!imageLoaded && <div className="image-placeholder">Cargando...</div>}
            <img 
              src={image} 
              alt={name}
              className="pokemon-image"
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? 'block' : 'none' }}
            />
          </div>
          
          <div className="card-body">
            <h5 className="pokemon-name">{formatName(name)}</h5>
            
            <div className="pokemon-types">
              {types.map((type, index) => (
                <span 
                  key={index}
                  className="type-badge"
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        
        {showDetails && (
          <div className="card-back">
            <div className="card-body">
              <h5 className="pokemon-name">{formatName(name)}</h5>
              <div className="pokemon-stats">
                <div className="stat-item">
                  <span className="stat-label">Altura:</span>
                  <span className="stat-value">{height / 10} m</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Peso:</span>
                  <span className="stat-value">{weight / 10} kg</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Tipos:</span>
                  <span className="stat-value">
                    {types.map(type => type.type.name).join(', ')}
                  </span>
                </div>
              </div>
              <small className="text-muted">Haz clic para voltear</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  types: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  })),
  height: PropTypes.number,
  weight: PropTypes.number,
  showDetails: PropTypes.bool
};

export default Card;