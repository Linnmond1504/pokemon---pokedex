
import { useState, useEffect } from 'react';

const usePokemon = (page = 1, limit = 20, loadAll = false) => {
  const [pokemon, setPokemon] = useState([]);
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (loadAll) {
   
          if (allPokemon.length === 0) {
            // Primero obtener el count total
            const countResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1');
            const countData = await countResponse.json();
            setTotalCount(countData.count);
            
           
            const maxPokemon = Math.min(countData.count, 1010);
            const listResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon?limit=${maxPokemon}&offset=0`
            );
            
            if (!listResponse.ok) {
              throw new Error('Error al obtener la lista completa de Pokémon');
            }
            
            const listData = await listResponse.json();
            
        
            const pokemonDetailsPromises = listData.results.map(async (pokemon) => {
              const response = await fetch(pokemon.url);
              if (!response.ok) {
                throw new Error(`Error al obtener detalles de ${pokemon.name}`);
              }
              return response.json();
            });
            
            const pokemonDetails = await Promise.all(pokemonDetailsPromises);
            setAllPokemon(pokemonDetails);
            setPokemon(pokemonDetails);
          } else {
         
            setPokemon(allPokemon);
          }
        } else {
         
          const offset = (page - 1) * limit;
          
          const listResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
          );
          
          if (!listResponse.ok) {
            throw new Error('Error al obtener la lista de Pokémon');
          }
          
          const listData = await listResponse.json();
          setTotalCount(listData.count);
          
          const pokemonDetailsPromises = listData.results.map(async (pokemon) => {
            const response = await fetch(pokemon.url);
            if (!response.ok) {
              throw new Error(`Error al obtener detalles de ${pokemon.name}`);
            }
            return response.json();
          });
          
          const pokemonDetails = await Promise.all(pokemonDetailsPromises);
          setPokemon(pokemonDetails);
        }
        
      } catch (err) {
        setError(err.message);
        console.error('Error en usePokemon:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [page, limit, loadAll, allPokemon.length]);

  return { pokemon, loading, error, totalCount, allPokemon };
};

export default usePokemon;