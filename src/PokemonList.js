import React from 'react';

function PokemonList({ pokemonList }) {
  return (
    <ul>
      {pokemonList.map(pokemon => (
        <li key={pokemon.id}>
          <img src={pokemon.image} alt={`Imagen de ${pokemon.name}`} />
          <span>{pokemon.id}</span>
          <span>{pokemon.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
