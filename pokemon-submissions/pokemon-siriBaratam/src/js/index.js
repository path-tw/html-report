'use strict';
const fetchPokemons = async () => {
  const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const pokemonsData = await pokemonsResponse.json();
  const pokemons = pokemonsData.results;
  var array = [];
  for (const pokemon of pokemons) {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();
    const object = {
      name: pokemon.name,
      id: pokemonData.id,
      type: pokemonData.types[0].type.name,
      imageUrl: pokemonData.sprites.front_default
    }
    array.push(object);
  };
  return new Promise((resolve, reject) => {
    resolve(array)
  });
};

const createType = (type) => {
  const typeContainer = document.createElement('p');
  typeContainer.classList.add('pokemon-type');
  typeContainer.innerText = type;
  return typeContainer;
};

const createId = (id) => {
  const idContainer = document.createElement('p');
  idContainer.classList.add('pokemon-id');
  idContainer.innerText = id;
  return idContainer;
};

const createImage = (image) => {
  const imageContainer = document.createElement('img');
  imageContainer.src = image;
  imageContainer.classList.add('image');
  return imageContainer;
};

const createName = (name) => {
  const nameContainer = document.createElement('h2');
  nameContainer.classList.add('pokemon-name')
  nameContainer.innerText = name;
  return nameContainer;
};

const createPokemonContainer = (pokemon) => {
  const outerContainer = document.getElementById('outer-container');
  const container = document.createElement('div');
  container.classList.add('pokemon-container');
  container.appendChild(createName(pokemon.name));
  container.appendChild(createImage(pokemon.imageUrl));
  container.appendChild(createId(pokemon.id));
  container.appendChild(createType(pokemon.type));
  outerContainer.appendChild(container);
};

const removeClassMainLoader = () => {
  const main = document.getElementById('main');
  main.removeAttribute('class', 'main');
  const outerContainer = document.querySelector('#outer-container');
  outerContainer.innerText = '';
};

const start = async () => {
  const array = await fetchPokemons();
  removeClassMainLoader();
  array.forEach(pokemon => {
    createPokemonContainer(pokemon);
  })
};

window.onload = start;
