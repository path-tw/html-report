'use strict';
async function fetchPokemonDetails() {
  fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=1268')
.then((response) => {
  return response.json();
})
.then((data) => {
  return data.results;
})
.then( (data) => {
  for( let index = 0; index < data.length; index++) {
  fetch(data[index].url)
  .then((data) => {
   return data.json();
  })
  .then((data) => {
    const pokemonContainer = document.getElementById('pokemon-container');
    const divelem = document.createElement('div');
    const pokemonImg = document.createElement('img');
    const pokemonName = document.createElement('p');
    const pokemonType = document.createElement('p');
    const pokemonId = document.createElement('p');

    pokemonImg.src = data.sprites.front_default;
    divelem.append(pokemonImg);
    divelem.appendChild(pokemonName).innerText ='Name: ' + data.name;
    divelem.appendChild(pokemonType).innerText = 'Id :'+data.id;
    divelem.appendChild(pokemonId).innerText = 'Type: '+ data.types.map(type => type.type.name).join(',');
    pokemonContainer.appendChild(divelem);
  })
  }
})
};

const main = () => {
    setTimeout( () => {
        document.getElementById('popupMsg').style.display = "none";
        document.querySelector('.page-heading').style.display = 'block';
        fetchPokemonDetails();
    },7000);
  };
main();