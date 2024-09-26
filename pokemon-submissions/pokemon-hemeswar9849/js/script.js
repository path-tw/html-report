'use strict';

const getTheData = () => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1');
      const resultData = await fetchedData.json();
      resolve(resultData);
    } catch (error) {
      console.log(error);
    }
  });
};

const getTheDetails = (pokemonDetailsLink) => {
  return new Promise(async (resolve) => {
    try {
      const fetchedData = await fetch(pokemonDetailsLink);
      const pokemonDetails = await fetchedData.json();
      resolve(pokemonDetails);
    } catch (error) {
      console.log(error);
    }
  });
};

const createAPokemonContainer = () => {
  const pokemonContainer = document.createElement('div');
  pokemonContainer.classList.add('aPokemon');
  return pokemonContainer;
};

const appendPokemonID = (pokemonContainer, pokemonDetails) => {
  const IDh3 = document.createElement('h3');
  IDh3.innerText = pokemonDetails.id;
  IDh3.classList.add('pokemonid');
  pokemonContainer.appendChild(IDh3);
};

const appendPokemonImage = (pokemonContainer, pokemonDetails) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemonDetails.sprites.front_default;
  pokemonContainer.appendChild(pokemonImage);
};

const appendPokemonName = (pokemonContainer, pokemonDetails) => {
  const pokemonNameh3 = document.createElement('h3');
  pokemonNameh3.innerText = 'Pokémon name : ';
  const pokemonNamediv = document.createElement('div');
  pokemonNamediv.innerText = pokemonDetails.name;
  pokemonContainer.append(pokemonNameh3, pokemonNamediv);
};

const appendPokemonType = (pokemonContainer, pokemonDetails) => {
  const pokemonTypesh3 = document.createElement('h3');
  pokemonTypesh3.innerText = 'Type/Types: ';
  pokemonContainer.appendChild(pokemonTypesh3);
  pokemonTypesh3.classList.add('types');
  const pokemonTypespan = document.createElement('span');
  pokemonDetails.types.forEach(type => {
    pokemonTypespan.classList.add('type');
    pokemonTypespan.innerText = pokemonTypespan.innerText + `  ${type.type.name}`;
  });
  pokemonContainer.appendChild(pokemonTypespan);
};

const appendDetailsToPokemonConatier = (pokemon, callback) => {
  const containers = document.querySelector('#containers');
  const pokemonContainer = callback();
  appendPokemonID(pokemonContainer, pokemon);
  appendPokemonName(pokemonContainer, pokemon);
  appendPokemonImage(pokemonContainer, pokemon);
  appendPokemonType(pokemonContainer, pokemon);
  containers.appendChild(pokemonContainer);
};

const createAndAppendLoader = () => {
  const body = document.querySelector('body');
  const divTag = document.createElement('div');
  divTag.classList.add('loading');
  body.appendChild(divTag);
};

const appendAllPokemonDetails = async () => {
  createAndAppendLoader();
  const loader = document.querySelector('.loading');
  const pokemons = await getTheData();
  pokemons.results.forEach(async (pokemon) => {
    const pokemonDetails = await getTheDetails(pokemon.url);
    appendDetailsToPokemonConatier(pokemonDetails, createAPokemonContainer);
    loader.remove();
  });
};

const searchBarFunctionality = (event) => {
  const sampleText = 'hemeswar reddy';
  sampleText.includes(event.target.value);
};

const appendSearchBar = (header) => {
  const searchBar = document.createElement('input');
  searchBar.placeholder = 'Search Here';
  searchBar.setAttribute('id', 'searchBar');
  searchBar.setAttribute('oninput', 'searchBarFunctionality(event)');
  header.appendChild(searchBar);
};

const appendMainHeading = (header) => {
  const mainHeading = document.createElement('h1');
  mainHeading.innerText = 'Pokédex';
  mainHeading.setAttribute('id', 'mainHeading');
  header.appendChild(mainHeading);
}

const appendInHeaders = () => {
  const header = document.querySelector('header');
  appendMainHeading(header);
  appendSearchBar(header);
};

const main = () => {
  appendInHeaders();
  appendAllPokemonDetails();
};

window.onload = main;
