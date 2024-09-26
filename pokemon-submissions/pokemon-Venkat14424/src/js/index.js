'use strict'
const appendPokemonName = (data) => {
  const pokemonName = document.createElement('p');
  pokemonName.innerHTML = "Name: " + data.name;
  return pokemonName;
}

const appendPokemanId = (data) => {
  const pokemonId = document.createElement('p');
  pokemonId.innerHTML = "ID: " + data.id;
  return pokemonId;
}

const appendPokemanImage = (data) => {
  const pokemonImg = document.createElement('img');
  pokemonImg.setAttribute('src', data.sprites.front_default);
  return pokemonImg;
}
const appendPokemanType = (data) => {
  const pokemonTypes = document.createElement('p');
  pokemonTypes.innerHTML = "Types: " + data.types.map(type => type.type.name).join(', ');
  return pokemonTypes;
}
const displayPokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const pokemonData = document.createElement('section');
  pokemonData.appendChild(appendPokemanImage(data));
  pokemonData.appendChild(appendPokemanId(data));
  pokemonData.appendChild(appendPokemonName(data));
  pokemonData.appendChild(appendPokemanType(data));
  document.getElementById('pokemonContainer').appendChild(pokemonData);
}

async function fetchPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=200');
  const data = await response.json();
  console.log(data);
  data.results.forEach((pokemon) => {
    displayPokemon(pokemon.url);
  });
}

window.onload = fetchPokemons;
