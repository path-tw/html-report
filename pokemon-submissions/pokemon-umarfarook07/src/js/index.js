'use strict';

const capitalizeFirstLetter = (textContent) => {
  return textContent.charAt(0).toUpperCase() + textContent.slice(1);
};

const createPokemonImage = (pokemon) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.sprites.front_default || 'no-image.jpg';
  pokemonImage.alt = pokemon.name;
  pokemonImage.classList.add('pokemon-img');
  return pokemonImage;
};

const createPokemonNameElement = (pokemon) => {
  const pokemonNameElement = document.createElement('h2');
  pokemonNameElement.classList.add('pokemon-name');
  pokemonNameElement.textContent = capitalizeFirstLetter(pokemon.name);
  return pokemonNameElement;
};

const createPokemonIdElement = (pokemon) => {
  const pokemonIdElement = document.createElement('div');
  pokemonIdElement.classList.add('pokemon-id');
  pokemonIdElement.textContent = pokemon.id;
  return pokemonIdElement;
};

const createPokemonTypeElement = (typeInfo) => {
  const typeElement = document.createElement('div');
  typeElement.classList.add('pokemon-type');
  typeElement.textContent = capitalizeFirstLetter(typeInfo.type.name);
  return typeElement;
};

const createPokemonTypesElement = (pokemon) => {
  const pokemonTypesElement = document.createElement('div');
  pokemonTypesElement.classList.add('pokemon-types');
  pokemon.types.forEach((typeInfo) => {
    const typeElement = createPokemonTypeElement(typeInfo);
    pokemonTypesElement.appendChild(typeElement);
  });
  return pokemonTypesElement;
};

const createPokemonCard = (pokemon) => {
  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('pokemon-card');

  pokemonCard.appendChild(createPokemonImage(pokemon));
  pokemonCard.appendChild(createPokemonNameElement(pokemon));
  pokemonCard.appendChild(createPokemonIdElement(pokemon));
  pokemonCard.appendChild(createPokemonTypesElement(pokemon));

  return pokemonCard;
};

const handleSearch = async () => {
  const searchElement = document.getElementById('search');
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchElement.value}`
  );
  const searchResults = await response.json();
  console.log([searchResults]);
  await renderPokemons([searchResults]);
};

const fetchPokemonDetails = async (pokemon) => {
  const pokemonDetails = await fetch(pokemon.url);
  const parsedPokemonDetails = await pokemonDetails.json();
  return parsedPokemonDetails;
};

const fetchPokemons = async () => {
  showLoadingIndicator();
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
  );
  const pokemons = await response.json();
  return pokemons;
};
const addSearchButtonEventListener = () => {
  const searchButton = document.getElementById('search-btn');
  searchButton.onclick = handleSearch;
};

const renderPokemons = async (pokemons) => {
  const pokemonGrid = document.getElementById('pokemon-grid');
  pokemonGrid.innerHTML = '';
    pokemons.results.forEach(async (pokemon) => {
      const parsedPokemonDetails = await fetchPokemonDetails(pokemon);
      const pokemonCard = createPokemonCard(parsedPokemonDetails);
      pokemonGrid.appendChild(pokemonCard);
    });
};

const main = async () => {
  const pokemons = await fetchPokemons();
  await renderPokemons(pokemons);
  addSearchButtonEventListener();
};

window.onload = main;
