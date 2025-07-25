
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import '../styles/Home.css';
import { Link } from 'react-router-dom'

const Home = ({ 
  title = "Bienvenido al Mundo Pokémon",
  subtitle = "Descubre y explora todos los Pokémon",
  featuredTitle = "Pokémon Destacados"
}) => {
  const [featuredPokemon, setFeaturedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pokémon destacados para la página principal
  const featuredIds = [25, 1, 6, 150, 256, 678, 950, 924]; // Pikachu, Bulbasaur, Charizard, Mewtwo

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

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{title}</h1>
            <p className="hero-subtitle">{subtitle}</p>
            <div className="hero-buttons">
              <Link to="/gallery" className="btn btn-primary btn-lg me-3">
                Explorar Pokédex
              </Link>
              <Link to="/contact" className="btn btn-outline-light btn-lg">
                Conoce Más
              </Link>
            </div>
          </div>
        </div>
      </section>


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