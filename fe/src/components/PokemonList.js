import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = ({ history }) => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      setPokemonList(response.data.results);
    };

    fetchPokemonList();
  }, []);

  return (
    <div>
      <h2>Pokemon List</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.name}
            onClick={() => history.push(`/pokemon/${pokemon.name}`)}
            style={{
              backgroundColor: '#f2f2f2',
              margin: '5px',
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease',
            }}
          >
            {pokemon.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
