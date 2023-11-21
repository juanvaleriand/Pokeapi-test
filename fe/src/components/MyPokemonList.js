import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPokemonList = () => {
  const [myPokemonList, setMyPokemonList] = useState([]);

  useEffect(() => {
    const fetchMyPokemonList = async () => {
      try {
        const response = await axios.get('http://localhost:3001/myPokemonList');
        setMyPokemonList(response.data.myPokemonList);
      } catch (error) {
        console.error('Error fetching My Pokemon List:', error.message);
      }
    };

    fetchMyPokemonList();
  }, []);

  const releasePokemon = async (pokemonId) => {
    try {
      const response = await axios.post('http://localhost:3001/releasePokemon', {
        pokemonId,
      });
      const releaseNumber = response.data.releasedNumber;

      setMyPokemonList((prevList) => prevList.filter((pokemon) => pokemon.id !== pokemonId));

      alert(`Pokemon released! Release Number: ${releaseNumber}`);
    } catch (error) {
      console.error('Error releasing Pokemon:', error.message);
      alert(error.message);
    }
  };

  const renamePokemon = async (pokemonId, nickname) => {
    try {
      const response = await axios.post('http://localhost:3001/renamePokemon', {
        pokemonId,
        nickname,
      });

      const newNickname = response.data.newName;

      setMyPokemonList((prevList) =>
        prevList.map((pokemon) =>
          pokemon.id === pokemonId ? { ...pokemon, nickname: newNickname } : pokemon
        )
      );
    } catch (error) {
      console.error('Error renaming Pokemon:', error.message);
      alert('Failed to rename Pokemon. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2 style={{ color: '#ff4500' }}>My Pokemon List</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {myPokemonList.map((pokemon) => (
          <li key={pokemon.id} style={listItemStyle}>
            <span style={{ marginRight: '10px' }}>{pokemon.nickname}</span>
            <button onClick={() => releasePokemon(pokemon.id)} style={buttonStyle}>
              Release
            </button>
            <button onClick={() => renamePokemon(pokemon.id, pokemon.nickname)} style={buttonStyle}>
              Rename
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const listItemStyle = {
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#f0f0f0',
  borderRadius: '5px',
};

const buttonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '8px 16px',
  fontSize: '14px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
  marginLeft: '5px',
};

export default MyPokemonList;
