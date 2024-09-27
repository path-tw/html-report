'use strict';
const fetchPokemons = async () => {
  const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon');
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

const createType = (type, searchValue) => {
  const typeContainer = document.createElement('p');
  typeContainer.classList.add('pokemon-type');
  typeContainer.innerHTML = type.replace(new RegExp(searchValue, 'gi'),(match)=> `<mark>${match}</mark>`);;
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

const createName = (name, searchValue) => {
  const nameContainer = document.createElement('h2');
  nameContainer.classList.add('pokemon-name')
  nameContainer.innerHTML = name.replace(new RegExp(searchValue, 'gi'),(match)=> `<mark>${match}</mark>`);
  return nameContainer;
};

const createPokemonContainer = (pokemon, value) => {
  const outerContainer = document.getElementById('outer-container');
  const container = document.createElement('div');
  container.classList.add('pokemon-container');
  container.appendChild(createName(pokemon.name, value));
  container.appendChild(createImage(pokemon.imageUrl));
  container.appendChild(createId(pokemon.id));
  container.appendChild(createType(pokemon.type, value));
  outerContainer.appendChild(container);
};

const afterFetchActions = () => {
  const main = document.getElementById('main');
  main.removeAttribute('class', 'main');
  const outerContainer = document.querySelector('#outer-container');
  outerContainer.innerText = '';
  const search = document.getElementById('search');
  search.style.display = 'block';
};

const filterPokemons = (search, array) => {
  const outerContainer = document.querySelector('#outer-container');
  outerContainer.innerText = '';
  const value = search.value.toLowerCase();
  const newArray = [];
  array.forEach((pokemon)=> {
    const name = pokemon.name;
    const id = pokemon.id;
    const type = pokemon.type;
    if (name.includes(value) || type.includes(value) || id == value ) {
      newArray.push(pokemon);
    }
  });
  newArray.forEach(pokemon => {
    createPokemonContainer(pokemon, value);
  })
};

const start = async () => {
  const array = await fetchPokemons();
  afterFetchActions();
  array.forEach(pokemon => {
    createPokemonContainer(pokemon);
  })
  const search = document.getElementById('search');
  search.addEventListener('input', () => {filterPokemons(search, array)});
};

window.onload = start;
