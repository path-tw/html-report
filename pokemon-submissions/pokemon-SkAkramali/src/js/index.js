 'use strict';
const fetchPokemon = async(url) => {
  const response = await fetch(url);
  const pokemonData = await response.json();
  console.log(pokemonData);
  return pokemonData;
}
const appendDetails = (details) => {
  const imageContainer = document.createElement('img');
  const nameContainer = document.createElement('p');
  const nameId = document.createElement('p');
  const nametype = document.createElement('p');
  imageContainer.src = details.imageUrl;
  nameContainer.innerText = 'Name: ' + details.name;
  nameId.innerText = 'Id: ' + details.pokenonId;
  nametype.innerText ='type: ' + details.pokemonType;
  const element = {image: imageContainer, name: nameContainer, id: nameId, type: nametype};
  return element;
}
const createPokemon = async (pokemon) => {
  const pokemonName = pokemon.name;
  const pokemonContainer = document.createElement('div');
  const pokemonsContainer = document.querySelector('.pokemonContainer');
  const url = 'https://pokeapi.co/api/v2/pokemon/'+ pokemonName;
  console.log(url);
  const pokemonData = await fetchPokemon(url);
  console.log(pokemonData)
  const details = {name: pokemonName, imageUrl: pokemonData.sprites.front_default, pokenonId: pokemonData.id, pokemonType: pokemonData.types[0].type.name}
  const element = appendDetails(details);
  pokemonContainer.append(element.image,element.name, element.id, element.type);
  pokemonContainer.setAttribute('class', 'pokemon');
  pokemonsContainer.append(pokemonContainer);
}
const appendPokemon = (pokemons) => {
  for(let index = 0; index < pokemons.length; index++) {
    createPokemon(pokemons[index]);
  }
}

const fetchPokemons = async() => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const response = await fetch(url);
  const pokemonsData = await response.json();
  const pokemons = pokemonsData.results;
  appendPokemon(pokemons);
 }

window.onload = () => {
  const container = document.querySelector('.pokemonContainer')
  setTimeout(() => {
    container.innerText = '';
    fetchPokemons();
  });
}