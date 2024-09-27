'use strict';

window.onload = async () => {
    const container = document.getElementById('main-container');
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await response.json();
    const pokemonArray = data.results;
    renderPokemon(pokemonArray);
  };

  const renderPokemon = function (pokemonArray) {
  pokemonArray.forEach(async (pokemon) => {
    const pokemonData = await fetch(pokemon.url);
    const parsedPokemon = await pokemonData.json();
    generatePokemon(parsedPokemon);
  });
  document.getElementById('page-loader').classList.add('hide');
};

const generatePokemon = function (pokemon) {
  const pokemonContainer = createPokemonContainer();
  pokemonContainer.append(generatePokemonImage(pokemon));
  pokemonContainer.append(generatePokemonDetails('Name', pokemon.name));
  pokemonContainer.append(generatePokemonDetails('Id', pokemon.id));
  pokemonContainer.append(generatePokemonDetails('Type', pokemon.types.map(index => index.type.name).join(', ')));
  document.getElementById('main-container').append(pokemonContainer);
}

const createPokemonContainer = function () {
  const container = document.createElement('div');
  container.classList.add('pokemon-container');
  return container;
}

const generatePokemonImage = function (obj) {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = obj.sprites.front_default;
  pokemonImage.alt = obj.name;
  return pokemonImage;
}

const generatePokemonDetails = function(key, value) {
  const detail = document.createElement('h2');
  detail.innerText = key + ': ' + value;
  return detail;
}