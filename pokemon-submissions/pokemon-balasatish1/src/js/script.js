'use strict';

const removeLoadingAnimation = async function () {
  const loadingContainer = document.querySelector('#loading-container');
  loadingContainer.remove();
};

const renderEachPokemon = function (eachPokemon) {
  const pokemonGallery = document.querySelector('.pokemon-gallery');

  const divTag = document.createElement('div');
  divTag.classList.add('pokemon');

  const idPara = document.createElement('p');
  const idSpan = document.createElement('span');
  idPara.append('Id : ', idSpan);

  const namePara = document.createElement('p');
  const nameSpan = document.createElement('span');
  namePara.append('Name : ', nameSpan);

  const typePara = document.createElement('p');
  const typeSpan = document.createElement('span');
  typePara.append('Type : ', typeSpan);

  const image = document.createElement('img');

  image.src = eachPokemon.imageUrl;
  idSpan.innerText = eachPokemon.id;
  nameSpan.innerText = eachPokemon.name;
  typeSpan.innerText = eachPokemon.type;

  divTag.append(image, idPara, namePara, typePara);
  pokemonGallery.appendChild(divTag);
};

const renderDataInGallery = async (allPokemonData) => {
  for (const eachPokemon of allPokemonData) {
    renderEachPokemon(eachPokemon);
  }
};

const getSpecificData = async (eachData) => {
  const eachPokemon = {};
  const response = await fetch(eachData.url);
  const responseData = await response.json();
  eachPokemon.name = responseData.name;
  eachPokemon.id= responseData.id;
  eachPokemon.imageUrl = responseData.sprites.back_default;
  eachPokemon.type = responseData.types[0].type.name;
  return eachPokemon;
};

const getPokemonData = async () => {
  const allPokemonData = [];
  const pokemonCount = 150;
  const url = `https://pokeapi.co/api/v2/pokemon-form/?limit=${pokemonCount}`;
  const response = await fetch(url);
  const responseData = await response.json();
  const requiredData = responseData.results;
  for (const eachData of requiredData) {
    allPokemonData.push(await getSpecificData(eachData));
  }
  await renderDataInGallery(allPokemonData);
};

const main = async function () {
  await getPokemonData();
  await removeLoadingAnimation();
};

window.onload = main;