'use strict';

const createElementWithClass = (tag, className, textContent = '') => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = textContent;
  return element;
};

const fetchPokemonName = (pokemonResults, i) => {
  const name = pokemonResults[i].name;
  return createElementWithClass('h1', 'pokemon-name', `Name: ${name}`);
};

const fetchPokemonImage = (pokemonsDetails) => {
  const pokemonImage = pokemonsDetails.sprites.front_default || 'src/images/pokemon-logo-black-transparent.png';
  const image = createElementWithClass('img', 'pokemon-images');
  image.src = pokemonImage;

  const imageDiv = createElementWithClass('div', 'pokemon-images-div');
  imageDiv.appendChild(image);
  return imageDiv;
};

const fetchPokemonId = (pokemonsDetails) => {
  return createElementWithClass('h3', 'pokemon-id', `Id: ${pokemonsDetails.id}`);
};

const fetchPokemonType = (pokemonsDetails) => {
  let types = '';
  pokemonsDetails.types.forEach((typeInfo, index) => {
    types += typeInfo.type.name;
    if (index < pokemonsDetails.types.length - 1) types += ', ';
  });
  return createElementWithClass('h3', 'pokemon-type', `Type: ${types}`);
};

const displayPokemons = async (pokemonResults) => {
  const main = document.querySelector('#main');
  for (let i = 0; i < pokemonResults.length; i++) {
    const pokemon = createElementWithClass('div', 'pokemon');

    try {
      const response = await fetch(pokemonResults[i].url);
      const pokemonsDetails = await response.json();

      const pokemonName = fetchPokemonName(pokemonResults, i);
      const pokemonType = fetchPokemonType(pokemonsDetails);
      const pokemonId = fetchPokemonId(pokemonsDetails);
      const pokemonImage = fetchPokemonImage(pokemonsDetails);

      pokemon.append(pokemonImage, pokemonName, pokemonId, pokemonType);
      main.appendChild(pokemon);
    } catch (error) {
      console.error(`Error fetching Pokémon details: ${error.message}`);
    }
  }
};

const showLoader = () => {
  const loading = createElementWithClass('div', 'loading');
  const loadingText = createElementWithClass('h1', '', 'Loading Pokemons');
  const loadAnimation = createElementWithClass('p', 'loadAnimation');

  loading.append(loadingText, loadAnimation);
  document.body.appendChild(loading);
};

const hideLoader = () => {
  const loading = document.getElementById('loading');
  if (loading) loading.remove();
  document.querySelector('#main').style.display = 'flex';
};

const fetchPokemons = async () => {
  try {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const response = await fetch(apiUrl);
    const pokemonList = await response.json();
    await displayPokemons(pokemonList.results);
  } catch (error) {
    console.error(`Error fetching Pokémon list: ${error.message}`);
  } finally {
    hideLoader();
  }
};

const searchPokemons = () => {
  const searchInput = document.getElementById('searchBar');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const allPokemons = document.querySelectorAll('.pokemon');

    let pokemonFound = false;
    allPokemons.forEach(pokemon => {
      const pokemonName = pokemon.querySelector('.pokemon-name').innerText.toLowerCase();
      const pokemonId = pokemon.querySelector('.pokemon-id').innerText.toLowerCase();
      const pokemonType = pokemon.querySelector('.pokemon-type').innerText.toLowerCase();

      if (pokemonName.includes(searchTerm) || pokemonId.includes(searchTerm) || pokemonType.includes(searchTerm)) {
        pokemon.style.display = 'block';
        pokemonFound = true;
      } else {
        pokemon.style.display = 'none';
      }
    });

    if (!pokemonFound) {
      console.log("No Pokémon found");
    }
  });
};

window.onload = () => {
  showLoader();
  fetchPokemons();
  searchPokemons();
};
