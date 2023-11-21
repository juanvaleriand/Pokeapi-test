import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PokemonDetail = ({ match }) => {
  const [pokemon, setPokemon] = useState(null);
  const [catchSuccess, setCatchSuccess] = useState(null);
  const [nickname, setNickname] = useState('');
  const [savedPokemon, setSavedPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${match.params.name}`);
      setPokemon(response.data);
    };

    fetchPokemonDetail();
  }, [match.params.name]);

  const catchPokemon = async () => {
    const response = await axios.get('http://localhost:3001/catchPokemon');
    const { probability } = response.data;

    const isCaught = Math.random() < probability;

    console.log('isCaught => ', isCaught);

    setCatchSuccess(isCaught);
  };

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const savePokemon = async () => {
    if (nickname.trim() === '') {
      alert('Please provide a nickname for your Pokemon.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/savePokemon', {
        id: pokemon.id,
        pokemonName: pokemon.name,
        nickname: nickname,
      });
      const savedPokemon = response.data;
      setSavedPokemon(savedPokemon);
    } catch (error) {
      console.error('Error saving Pokemon:', error.message);
      alert('Failed to save Pokemon. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {pokemon && (
        <>
          <h2 style={{ color: '#ff4500', textTransform: 'capitalize' }}>{pokemon.name}</h2>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            style={{ maxWidth: '200px', margin: '10px' }}
          />
          <h3 style={{ color: '#333' }}>Moves:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pokemon.moves.map((move) => (
              <li key={move.move.name} style={{ margin: '5px', fontSize: '14px' }}>
                {move.move.name}
              </li>
            ))}
          </ul>
          <h3 style={{ color: '#333' }}>Types:</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pokemon.types.map((type) => (
              <li key={type.type.name} style={{ margin: '5px', fontSize: '14px' }}>
                {type.type.name}
              </li>
            ))}
          </ul>
          {catchSuccess === null ? (
            <button
              onClick={catchPokemon}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: 'none',
                marginRight: '10px',
              }}
            >
              Catch Pokemon
            </button>
          ) : catchSuccess ? (
            <>
              <p>Congratulations! You caught the Pokemon!</p>
              <label>
                Nickname:
                <input type="text" value={nickname} onChange={handleNicknameChange} />
              </label>
              <button
                onClick={savePokemon}
                style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  border: 'none',
                  marginLeft: '10px',
                }}
              >
                Save Pokemon
              </button>
            </>
          ) : (
            <p>Oops! The Pokemon escaped!</p>
          )}
          {savedPokemon && (
            <div>
              <p>Pokemon saved with nickname: {savedPokemon.nickname}</p>
              <Link to="/my-pokemon-list">Go to My Pokemon List</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
