'use strict';

let allPokemonsData = [];

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
  allPokemonsData.push(data);
}

const fetchpokemonData = async () => {
  const totalPokemons = 200;
  return new Promise(async (resolve) => {
    for (let id = 1; id <= totalPokemons; id++) {
      await renderApiData(id);
    }
   resolve('resolved');
  });
};

const displayLoader = async () => {
  document.getElementById('search').addEventListener('input', setupSearch);
  const loader = document.getElementById('loader');
  let renderPokemon = 'pending';
  loader.style.display = 'flex';
  renderPokemon = await fetchpokemonData();
  for(let id = 1; id < allPokemonsData.length; id++) {
    await createPokemonDiv(allPokemonsData[id]);
  }
  loader.style.display = 'none';
};

window.onload = displayLoader;
