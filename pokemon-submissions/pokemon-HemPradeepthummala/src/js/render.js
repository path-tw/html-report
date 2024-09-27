'use strict';

const displayData = (div) => {
  const main = document.getElementById('main-container');
  main.append(div)
};

const createDiv = (object) => {
  const div = document.createElement('div');
  const id = `poke${object.id}`;
  div.setAttribute('id',id);
  const image = document.createElement('img');
  image.src = object.image;
  const h3 = document.createElement('h3');
  const details = document.createElement('h4');
  const type = document.createElement('h4');
  type.innerText = 'Type :';
  for (let i of object.type) {
    type.innerText += `${i} `;
  }
  h3.innerText = object.name.toUpperCase();
  details.innerText = `Id : ${object.id}`;
  div.classList.add('div-container');
  div.appendChild(h3);
  div.appendChild(image);
  div.appendChild(type);
  div.appendChild(details);
  displayData(div);
};

const getPokeData = async () => {
  const pokemonData = [];
  const pokeData = (await (await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')).json());
  console.log('datafetched')
  let index =0;
  for (let i in pokeData.results) {
    const object = {};
    object.name = (pokeData.results[i].name);
    const pokemon = await (await fetch(pokeData.results[i].url)).json();
    console.log('data')
    if(++index>500) {break;}
    object.id = pokemon.id;
    object.type = [];
    object.image = pokemon.sprites.front_default;
    for (const i of pokemon.types) {
      object.type.push(i.type.name);
    }
    pokemonData.push(object);
  }
  return pokemonData;
};

const getSearchedDiv = (pokemon) => {
  const searchValue = document.getElementById('search-input').value;
  console.log(searchValue)
  for(const i of pokemon) {
    for(const j of i.type){
      if(
        i.name.toLowerCase() === searchValue.toLowerCase() ||
        i.id == searchValue ||
        j.toLowerCase() === searchValue.toLowerCase()
      ) {
        document.getElementById(`poke${i.id}`).style.display = '';
        break;
      } else {
        document.getElementById(`poke${i.id}`).style.display = 'none';
      }
    }
  }
};

const load = async () => {
  const pokemon = await getPokeData();
  console.log('loaded')
  document.getElementById('load').remove();
  for(const poke in pokemon) {
    createDiv(pokemon[poke]);
  }
  document.getElementById('search-button').addEventListener('click',()=>getSearchedDiv(pokemon));
};

window.onload = load();