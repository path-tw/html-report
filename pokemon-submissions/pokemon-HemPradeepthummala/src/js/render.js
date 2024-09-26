'use strict';

const displayData = (div) => {
  const main = document.getElementById('main-container');
  main.append(div)
}

const createDiv = (object) => {
  const div = document.createElement('div');
  const image = document.createElement('img');
  image.src = object.image;
  const h3 = document.createElement('h3');
  const details = document.createElement('h4');
  const type = document.createElement('h4');
  type.innerText = 'Type :';
  for (let i of object.type) {
    type.innerText += `${i} `;
  }
  h3.innerText = object.name;
  details.innerText = `Id : ${object.id}`;
  div.classList.add('div-container');
  div.appendChild(h3);
  div.appendChild(image);
  div.appendChild(type);
  div.appendChild(details);
  displayData(div);
}

const getPokeData = async () => {
  const pokemonData = [];
  const pokeData = (await (await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')).json());
  for (let i in pokeData.results) {
    const object = {};
    object.name = (pokeData.results[i].name);
    const pokemon = await (await fetch(pokeData.results[i].url)).json();
    object.id = pokemon.id;
    object.type = [];
    object.image = pokemon.sprites.front_default;
    for (const i of pokemon.types) {
      object.type.push(i.type.name);
    }
    pokemonData.push(object);
  }
  return pokemonData;
}


const load = async () => {
  const pokemon = await getPokeData();
  document.getElementById('load').remove();
  for(const poke in pokemon) {
    createDiv(pokemon[poke]);
  }
}

window.onload = load();