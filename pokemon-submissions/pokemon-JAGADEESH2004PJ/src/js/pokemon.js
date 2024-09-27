'use strict';
const fetchConvertData = async (url) => {
  try {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

const fetchAllPokemons = async () => {
  const allPokemons = [];
  const loadingElement = document.querySelector('#loading');
  loadingElement.style.display = 'block';
  setTimeout(async () => {

      const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=10000`;
      const data = await fetchConvertData(apiUrl);
      for (const pokemon of data.results) {
        allPokemons.push(pokemon);
      }
      loadingElement.style.display = 'none';
      for (let i = 0; i < allPokemons.length; i++) {
        await appendToDom(allPokemons[i]);
      }
  }, 3000);
};


const appendToDom = async (pokemon) => {
  try {
    const data = await fetchConvertData(pokemon.url);
    const card = document.createElement('div');
    card.className = 'pokemonCard';
    createAndAppend(data, card);
  } catch (error) {
    console.log('Failed to load Pokémon data:', error);
  }
};

const createAndAppend = (pokemonData, pokemonCard) => {
  createAndAppendName(pokemonData, pokemonCard)
  createAndAppendImg(pokemonData, pokemonCard)
  createAndAppendId(pokemonData, pokemonCard);
  createAndAppendType(pokemonData, pokemonCard);
  document.getElementById('pokemonList').appendChild(pokemonCard);
};

const createAndAppendName = (pokemonData, pokemonCard) => {
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = `${pokemonData.name.charAt(0).toUpperCase()}${pokemonData.name.slice(1)}`;
  pokemonCard.appendChild(pokemonName);
};

const createAndAppendImg = (pokemonData, pokemonCard) => {
  const img = document.createElement('img');
  img.className = 'pokemonImage'
  img.src = pokemonData.sprites.front_default;
  img.alt = pokemonData.name;
  pokemonCard.appendChild(img);

};

const createAndAppendId = (pokemonData, pokemonCard) => {
  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;
  pokemonCard.appendChild(id);
};

const createAndAppendType = (pokemonData, pokemonCard) => {
  const types = document.createElement('p');
  const typeNames = [];
  for (let i = 0; i < pokemonData.types.length; i++) {
    typeNames.push(pokemonData.types[i].type.name);
  }
  types.textContent = `Types: ${typeNames.join(', ')}`;
  pokemonCard.appendChild(types);
};

const searchFunction = () => {
    const searchInput = document.querySelector('.searchBox');
    const possibilities = document.querySelectorAll('#pokemonList .pokemonCard');
    const pl = document.querySelector('#pokemonList')
    const userInput = searchInput.value.toLowerCase();
    for (let index = 0; index < possibilities.length; index++) {
      const suggestion = possibilities[index];
      const suggestionText = suggestion.textContent.toLowerCase();
      if (suggestionText.includes(userInput)) {
        suggestion.style.display = 'block';
      } else {
        suggestion.style.display = 'none';
      }
    }
  };

window.onload = () => {
  document.querySelector('.searchBox').addEventListener('input', searchFunction)
  fetchAllPokemons();
};