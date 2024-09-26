'use strict';

document.addEventListener('DOMContentLoaded', async () => {
  const loaderContainer = createLoader();
  try {
    await new Promise(resolve => setTimeout(resolve, 5000));
    await getAllPokemonData();
    loaderContainer.remove();
  } catch (error) {
    console.error(error);
  }
});

const createLoader = () => {
  const loaderContainer = document.createElement('div');
  loaderContainer.classList.add('loaderContainer');
  const loader = document.createElement('div');
  loader.classList.add('loader');
  loaderContainer.append(loader);
  document.body.appendChild(loaderContainer);
  return loaderContainer;
};

const getAllPokemonData = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=1025';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonList = data.results;
    await Promise.all(pokemonList.map(pokemon => getPokemonData(pokemon.name)));
  } catch (error) {
    console.error(error);
  }
};

const getPokemonData = async (Name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${Name}/`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    await displayPokemonData(data);
  } catch (error) {
    console.error(error);
  }
};

const displayPokemonData = async (data) => {
  const pokemonInfoSection = document.getElementById('pokemon-info');
  const pokemonCard = document.createElement('div');
  pokemonCard.className = 'pokemon-card';
  const pokemonImage = document.createElement('img');
  pokemonImage.src = data.sprites.front_default;
  pokemonCard.appendChild(pokemonImage);
  await displayPokemonNameIdType(data, pokemonInfoSection, pokemonCard);
};

const displayPokemonNameIdType = async (data, pokemonInfoSection, pokemonCard) => {
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = data.name;
  pokemonCard.appendChild(pokemonName);
  const pokemonId = document.createElement('p');
  pokemonId.textContent = `ID: ${data.id}`;
  pokemonCard.appendChild(pokemonId);
  const pokemonType = document.createElement('p');
  pokemonType.textContent = `Type: ${data.types[0].type.name}`;
  pokemonCard.appendChild(pokemonType);
  pokemonInfoSection.appendChild(pokemonCard);
};
