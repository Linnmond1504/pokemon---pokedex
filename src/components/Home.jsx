// src/components/Home.jsx - Con Datos Curiosos
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/Home.css';

const Home = ({ 
  title = "Bienvenido al Mundo Pokémon",
  subtitle = "Descubre y explora todos los Pokémon",
  featuredTitle = "Pokémon Destacados"
}) => {
  const [featuredPokemon, setFeaturedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  // Pokémon destacados para la página principal
  const featuredIds = [25, 1, 6, 150, 256, 678, 950, 924];

  // Datos curiosos sobre Pokémon
  const pokemonFacts = [
    {
      icon: "⚡",
      fact: "¿Sabías que Pikachu fue diseñado basándose en una ardilla y no en un ratón como muchos creen?"
    },
    {
      icon: "🌟",
      fact: "Mew contiene el ADN de todos los Pokémon existentes, por eso puede aprender cualquier movimiento."
    },
    {
      icon: "🔥",
      fact: "La temperatura de la llama de Charizard puede alcanzar los 3000 grados Fahrenheit."
    },
    {
      icon: "💎",
      fact: "Los Ditto pueden transformarse en cualquier objeto, pero mantienen sus ojos característicos."
    },
    {
      icon: "🌙",
      fact: "Clefairy iba a ser originalmente la mascota de Pokémon en lugar de Pikachu."
    },
    {
      icon: "⚔️",
      fact: "Alakazam tiene un coeficiente intelectual de más de 5000, superando a cualquier supercomputadora."
    },
    {
      icon: "🌊",
      fact: "Magikarp puede sobrevivir en casi cualquier cuerpo de agua, sin importar qué tan contaminado esté."
    },
    {
      icon: "👻",
      fact: "Los Pokémon fantasma pueden atravesar paredes, pero no pueden tocar objetos físicos a menos que quieran."
    }
  ];

  useEffect(() => {
    const fetchFeaturedPokemon = async () => {
      try {
        const promises = featuredIds.map(id => 
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
        );
        const results = await Promise.all(promises);
        setFeaturedPokemon(results);
      } catch (error) {
        console.error('Error al cargar Pokémon destacados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPokemon();
  }, []);

  // Cambiar dato curioso cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => 
        prevIndex === pokemonFacts.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [pokemonFacts.length]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg me-3">
                Explorar Pokédex
              </button>
              <button className="btn btn-outline-light btn-lg">
                Conoce Más
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="fun-facts-section">
        <div className="container">
          <div className="fun-fact-card">
            <h3 className="fun-fact-title">
              <span className="fact-icon">🎲</span>
              Dato Curioso Pokémon
            </h3>
            <div className="fact-content">
              <span className="fact-emoji">{pokemonFacts[currentFactIndex].icon}</span>
              <p className="fact-text">{pokemonFacts[currentFactIndex].fact}</p>
            </div>
            <div className="fact-indicators">
              {pokemonFacts.map((_, index) => (
                <button
                  key={index}
                  className={`fact-indicator ${index === currentFactIndex ? 'active' : ''}`}
                  onClick={() => setCurrentFactIndex(index)}
                  aria-label={`Ver dato curioso ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pokemon Section */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">{featuredTitle}</h2>
          
          {loading ? (
            <div className="loading-container">
              <div className="pokeball-loader"></div>
              <p>Cargando Pokémon...</p>
            </div>
          ) : (
            <div className="row">
              {featuredPokemon.map((pokemon) => (
                <div key={pokemon.id} className="col-lg-3 col-md-6 mb-4">
                  <Card
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.sprites.other['official-artwork'].front_default}
                    types={pokemon.types}
                    height={pokemon.height}
                    weight={pokemon.weight}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

Home.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  featuredTitle: PropTypes.string
};

export default Home;