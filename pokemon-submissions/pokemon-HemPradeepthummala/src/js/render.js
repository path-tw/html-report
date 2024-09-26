'use strict';
const pokemonData = [];

const displayData = (div) => {
  const main = document.getElementById('main-container');
  main.append(div)
  }
  
  const createDiv = (object) => {
    console.log('creating');
    const div = document.createElement('div');
    const image = document.createElement('image');
    image.src = object.image;
    const h3 = document.createElement('h3');
    const details = document.createElement('h4');
    h3.innerText = object.name;
    details.innerText = `Type : ${object.type}\nId : ${object.id}`;
    div.classList.add('div-container');
    div.append(h3,details,image);
    displayData(div);
  }

const getPokeName = async (type, url) => {
  const pokeName = (await (await fetch(url)).json());
  console.log('data loaded')
  let index = 0
  for (let pokemons of pokeName.pokemon) {
    for (let pokemon in pokemons) {
      if (pokemon === 'slot' ) {
        break;
      }
      const object = {};
      object.image = ((await(await fetch(pokemons[pokemon].url)).json()).sprites.front_default);
      console.log('imageloaded')
      object.name = pokemons[pokemon].name;
      object.type = type
      object.id = (++index);
      pokemonData.push(object);
    }
  }
};

const getPokeData = async () => {
  const pokeData = (await (await fetch('https://pokeapi.co/api/v2/type')).json());
  for (let i in pokeData.results) {
    const type = pokeData.results[i].name;
    await getPokeName(type, pokeData.results[i].url);
    for (const object of pokemonData) {
      createDiv(object);
    }
  }
}

window.onload = getPokeData();