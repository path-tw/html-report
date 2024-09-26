 'use strict';
const renderPokemon = async(url) => {
  const response = await fetch(url);
  const pokemonData = await response.json();
  return pokemonData;
};

const appendDetails = (details) => {
  const imageContainer = document.createElement('img');
  const nameContainer = document.createElement('p');
  const nameId = document.createElement('p');
  const nametype = document.createElement('p');
  imageContainer.src = details.imageUrl;
  nameContainer.innerText = details.name;
  nameId.innerText = details.pokenonId;
  nametype.innerText = details.pokemonType;
  nameContainer.setAttribute('class', 'name');
  nametype.setAttribute('class', 'type');
  nameId.setAttribute('class', 'id');
  const element = {image: imageContainer, name: nameContainer, id: nameId, type: nametype};
  return element;
};

const createPokemon = async (pokemon, index) => {
  const pokemonName = pokemon.name;
  const pokemonContainer = document.createElement('div');
  const pokemonsContainer = document.querySelector('.pokemonContainer');
  const url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonName;
  const pokemonData = await renderPokemon(url);
  const details = {name: pokemonName, imageUrl: pokemonData.sprites.front_default, pokenonId: pokemonData.id, pokemonType: pokemonData.types[0].type.name}
  const element = appendDetails(details);
  pokemonContainer.append(element.image,element.name, element.id, element.type);
  pokemonContainer.setAttribute('class', 'pokemon');
  pokemonContainer.setAttribute('id', index);
  pokemonsContainer.append(pokemonContainer);
}
const appendPokemon = (pokemons) => {
  const container = document.querySelector('.pokemonContainer');
  for(let index = 0; index < pokemons.length; index++) {
    createPokemon(pokemons[index], index);
  }
  container.innerText = '';
};

const fetchPokemons = async() => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const response = await fetch(url);
  const pokemonsData = await response.json();
  const pokemons = pokemonsData.results;
  try {
    appendPokemon(pokemons);
  }
  catch (error) {
    console.log(err);
  }
 };
const search = () => {
  const pokemons = document.querySelectorAll('.pokemon');
  const inputValue = document.querySelector('.search');
  let details;
  let pokemon;
  for(let index = 1; index < pokemons.length; index++) {
    pokemon = pokemons[index];
    // console.log(pokemon);
    details = pokemon.querySelectorAll('p');
    console.log(details[1]);
    // let checker = details[0].innerText;
    // console.log(checker);
    // if(!checker.innerText.includes(inputValue.value)) {
    //   checker.style.display = 'none';
    // }
  }
};

window.onload = () => {
  const inputValue = document.querySelector('.search');
  inputValue.addEventListener('input', search)
  fetchPokemons();
};