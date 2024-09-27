'use strict';
const POKEMON = [];

const createPTag = (text, className, id) => {
  const pTag = document.createElement('p');
  className && pTag.classList.add(className);
  id && pTag.classList.add(id);
  pTag.innerText = text;
  return pTag;
};

const createImageTag = (imageUrl, className, id) => {
  const pokemonImage = document.createElement('img');
  pokemonImage.src = imageUrl;
  className && pokemonImage.classList.add(className);
  id && pokemonImage.classList.add(id);
  return pokemonImage;
};

const displayPokemons = (pokemonData) => {
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.innerHTML = '';
  for (const thisPokemon of pokemonData) {
    const currentContainer = document.createElement('section');
    currentContainer.id = `pokemon-unit-${thisPokemon.id}`;
    currentContainer.className = 'pokemon-unit';
    const pokemonImage = createImageTag(thisPokemon.image, 'pokemon-image', `pokemon-image-${thisPokemon.image}`);
    const pokemonName = createPTag(`Name: ${thisPokemon.name}`, 'pokemon-name', `pokemon-name-${thisPokemon.name}`);
    const pokemonId = createPTag(`Id: ${thisPokemon.id}`, 'pokemon-id', `pokemon-id-${thisPokemon.id}`);
    const pokemonType = createPTag(`Types: ${thisPokemon.type}`, 'pokemon-type', `pokemon-type-${thisPokemon.type}`);
    currentContainer.append(pokemonImage, pokemonName, pokemonId, pokemonType);
    parent.appendChild(currentContainer);
  }
  return;
};

const determineType = (typesArray) => {
  const types = [];
  for (const element of typesArray) {
    types.push(element.type.name);
  }
  return types;
};

const makeFetchCall = async (url) => {
  try {
    const pokemonResponse = await fetch(url);
    const json = await pokemonResponse.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const createPokemon = async () => {
  for (let i = 1; i <= 1024; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon-form/${i}/`;
    const pokemon = await makeFetchCall(url);
    const pokemonTypes = determineType(pokemon.types);
    const currentPokemon = {
      name: pokemon['name'],
      image: pokemon['sprites']['front_default'],
      id: pokemon['id'],
      type: pokemonTypes
    };
    POKEMON.push(currentPokemon);
  }
  return new Promise((resolve, reject) => {
    resolve(POKEMON);
  });
};

const displayLoader = async () => {
  const loadMessage = createPTag('you are going to pokemon world in few moments...', 'load-message');
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.innerHTML = '';

  parent.appendChild(loadMessage);
  return;
};

const isTypeIncluded = (typesArray, inputText) => {
  let status = false;
  for (const type of typesArray) {
    status = status || type.includes(inputText);
  }
  return status;
};

const performSearch = (event) => {
  const inputText = event.target.value;
  if (inputText) {
    const matchedElements = [];
    for (const element of POKEMON) {
      if (element.name.includes(inputText) ||
        isTypeIncluded(element.type, inputText) ||
        element.id == inputText) {
        matchedElements.push(element);
      }
    }
    displayPokemons(matchedElements);
    return;
  }
  displayPokemons(POKEMON); // when the search input text has nothing
};

const removePopup = popup => {
  const header = document.getElementsByTagName('header')[0];
  header.classList.remove('disabled');

  popup.remove();
};

const createPopup = () => {
  console.log(1234567)
  const popup = createPTag('Kindly wait until the content is loaded', 'wait-popup');
  const parent = document.getElementsByClassName('pokemon-main-container')[0];
  parent.appendChild(popup);

  const header = document.getElementsByTagName('header')[0];
  header.classList.add('disabled');
  setTimeout(() => {
    removePopup(popup)
  }, 1500);
};

const addDefaultListeners = () => {
  const search = document.getElementById('search-bar');
  search.addEventListener('focus', createPopup);
};

const makeMainEventListeners = () => {
  const search = document.getElementById('search-bar');
  search.removeEventListener('focus', createPopup);
  search.value = '';
  search.addEventListener('input', () => performSearch(event));
  return;
};

const main = async () => {
  displayLoader();
  addDefaultListeners();
  const pokemonData = await createPokemon();
  displayPokemons(pokemonData);
  makeMainEventListeners();
};

window.onload = main;
