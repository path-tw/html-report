'use strict';

const insertData = (pokemonDiv, name, image, id, type , data) => {
 name.textContent = `${data.name}`;
 image.src = `${data.sprites.front_default}`;
 id.textContent = `ID: ${data.id}`;
 type.textContent = `TYPE: ${data.types.map(typeInfo => typeInfo.type.name)}`;
 pokemonDiv.appendChild(name);
 pokemonDiv.appendChild(image);
 pokemonDiv.appendChild(id);
 pokemonDiv.appendChild(type);
 return pokemonDiv;
};

const createPokemonDiv = (data) => {
  const container = document.getElementById('allpokemons');
  let pokemonDiv = document.createElement('div');
  const name = document.createElement('h2');
  const image = document.createElement('img');
  const id = document.createElement('h3');
  const type = document.createElement('h3');
  pokemonDiv.className = 'pokemon';
  const appendDiv = insertData(pokemonDiv, name, image, id, type, data);
  container.appendChild(appendDiv);
};

const renderApiData = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const fetchpokemonData = async () => {
  const totalPokemons = 500;
  let allPokemonsData = [];
  for (let id = 1; id <= totalPokemons; id++) {
    const data = await renderApiData(id);
    allPokemonsData.push(data);
  }
  return allPokemonsData;
};

const onloadPokemons = (displayType) => {
  const loader = document.getElementById('loader');
  loader.style.display = displayType;
}

const displayLoader = async () => {
  document.getElementById('search').addEventListener('input', setupSearch);
  let renderPokemon = 'pending';
  onloadPokemons('flex');
  renderPokemon = await fetchpokemonData();
  renderPokemon.forEach(pokemon => createPokemonDiv(pokemon));
  loader.style.display = 'none';
  onloadPokemons('none');
};

window.onload = displayLoader;
