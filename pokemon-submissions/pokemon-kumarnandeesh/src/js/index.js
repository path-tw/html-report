'use strict'

const toAppendName = (name) => {
    const nameContainer = document.createElement('h3');
    nameContainer.innerText = name;
    return nameContainer;
};

const toAppendId = (id) => {
    const idContainer = document.createElement('p');
    idContainer.innerText = id;
    return idContainer;
};

const toAppendImage = (url) => {
    const imageContainer = document.createElement('img');
    imageContainer.src = url;
    imageContainer.style.display = 'flex';
    return imageContainer;
};

const toAppendTypes = (type) => {
    
    const typeContainer = document.createElement('div');
    const array = [];
    for (let index = 0; index < type.length; index++) {
        const typeName = type[index].type.name;
        array.push(typeName);
        typeContainer.append(typeName);
    }

    return typeContainer;
};

const toFetchApi = async () => {
  const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  
  const pokemonData = await pokemon.json();
  const mainContainer = document .getElementById('main');
  for (let index = 0;index < pokemonData.results.length; index++) {

    const pokemonName = pokemonData.results[index].name;
    mainContainer.append(toAppendName(pokemonName));

    const pokemonDetails = await fetch(pokemonData.results[index].url);
    const data = await pokemonDetails.json();

    const pokemonId = data.id;
    mainContainer.append(toAppendId(pokemonId));

    const image = data.sprites.front_default;
    
    mainContainer.append(toAppendImage(image));
    
    const type = data.types;
    mainContainer.append(toAppendTypes(type));
    
    console.log(pokemonName , pokemonId);
  }
}

toFetchApi();