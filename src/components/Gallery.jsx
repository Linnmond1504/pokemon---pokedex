// src/components/Gallery.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import usePokemon from '../hooks/usepokemon';
import '../styles/Gallery.css';

const Gallery = ({ 
  title = "Pokédex Completa",
  itemsPerPage = 20 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  // Determinar si necesitamos cargar todos los Pokémon (cuando hay filtros activos)
  const hasActiveFilters = searchTerm.trim() !== '' || selectedType !== 'all';
  
  const { pokemon, loading, error, totalCount } = usePokemon(
    currentPage, 
    itemsPerPage, 
    hasActiveFilters // loadAll = true cuando hay filtros
  );
  
  // Filtrar Pokémon por búsqueda y tipo
  const filteredPokemon = pokemon.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || 
      p.types.some(type => type.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  // Para paginación de resultados filtrados
  const [filteredPage, setFilteredPage] = useState(1);
  const filteredItemsPerPage = 20;
  
  // Calcular elementos para mostrar según el modo
  const itemsToShow = hasActiveFilters 
    ? filteredPokemon.slice(
        (filteredPage - 1) * filteredItemsPerPage,
        filteredPage * filteredItemsPerPage
      )
    : filteredPokemon;

  const pokemonTypes = [
    'all', 'fire', 'water', 'grass', 'electric', 'psychic', 
    'ice', 'dragon', 'dark', 'fairy', 'poison', 'ground', 
    'flying', 'bug', 'rock', 'ghost', 'steel', 'fighting', 'normal'
  ];

  // Resetear páginas cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
    setFilteredPage(1);
  }, [searchTerm, selectedType]);

  const handlePageChange = (newPage) => {
    if (hasActiveFilters) {
      setFilteredPage(newPage);
    } else {
      setCurrentPage(newPage);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  // Calcular información de paginación
  const getCurrentPageInfo = () => {
    if (hasActiveFilters) {
      return {
        currentPage: filteredPage,
        totalPages: Math.ceil(filteredPokemon.length / filteredItemsPerPage),
        totalItems: filteredPokemon.length
      };
    } else {
      return {
        currentPage: currentPage,
        totalPages: Math.ceil(totalCount / itemsPerPage),
        totalItems: totalCount
      };
    }
  };

  const pageInfo = getCurrentPageInfo();

  if (error) {
    return (
      <div className="gallery-section">
        <div className="gallery-container">
          <div className="error-message">
            <h2>Error al cargar los Pokémon</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <div className="gallery-container">
        <h1 className="gallery-title">{title}</h1>
        
        {/* Filtros y búsqueda */}
        <div className="filters-section">
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <div className="search-box">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Buscar Pokémon..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <select 
                className="form-select form-select-lg"
                value={selectedType}
                onChange={handleTypeChange}
              >
                {pokemonTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'Todos los tipos' : 
                     type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Mostrar información de resultados */}
          {hasActiveFilters && (
            <div className="results-info">
              <p className="text-white-50">
                Mostrando {filteredPokemon.length} Pokémon 
                {searchTerm && ` que contienen "${searchTerm}"`}
                {selectedType !== 'all' && ` de tipo ${selectedType}`}
              </p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p style={{color: 'white', marginTop: '1rem'}}>
              {hasActiveFilters ? 'Cargando todos los Pokémon...' : 'Cargando Pokémon...'}
            </p>
          </div>
        ) : (
          <>
            {/* Grid de Pokémon */}
            <div className="pokemon-grid">
              {itemsToShow.length > 0 ? (
                itemsToShow.map((poke) => (
                  <div key={poke.id} className="pokemon-item">
                    <Card
                      id={poke.id}
                      name={poke.name}
                      image={poke.sprites.other['official-artwork'].front_default || 
                             poke.sprites.front_default}
                      types={poke.types}
                      height={poke.height}
                      weight={poke.weight}
                      showDetails={true}
                    />
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <h3 style={{color: 'white'}}>No se encontraron Pokémon</h3>
                  <p style={{color: 'rgba(255,255,255,0.8)'}}>
                    Intenta cambiar los filtros de búsqueda
                  </p>
                </div>
              )}
            </div>

            {/* Paginación */}
            {pageInfo.totalPages > 1 && (
              <div className="pagination-section">
                <nav aria-label="Navegación de páginas">
                  <div className="pagination-controls">
                    <button 
                      className="btn btn-outline-light"
                      onClick={() => handlePageChange(pageInfo.currentPage - 1)}
                      disabled={pageInfo.currentPage === 1}
                    >
                      ← Anterior
                    </button>
                    
                    <div className="page-info">
                      <span style={{color: 'white'}}>
                        Página {pageInfo.currentPage} de {pageInfo.totalPages}
                      </span>
                      <small style={{color: 'rgba(255,255,255,0.7)', display: 'block'}}>
                        ({pageInfo.totalItems} Pokémon total)
                      </small>
                    </div>
                    
                    <button 
                      className="btn btn-outline-light"
                      onClick={() => handlePageChange(pageInfo.currentPage + 1)}
                      disabled={pageInfo.currentPage >= pageInfo.totalPages}
                    >
                      Siguiente →
                    </button>
                  </div>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

Gallery.propTypes = {
  title: PropTypes.string,
  itemsPerPage: PropTypes.number
};

export default Gallery;