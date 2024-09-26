'use strict';

const getPokeDetials = async function (url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return [data.name, data.sprites.front_default, data.id, data.types[0].type.name];
  } catch (error) {
    return [null, null, null, null];
  }

};

const fetchPokesData = async function () {
  const pokesData = [];
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const data = await response.json();
  await new Promise(async (resovle, reject) => {
    setTimeout(async () => {
      for (let index = 0; index < data.count; index++) {
        const details = await getPokeDetials(data.results[index].url);
        pokesData.push(details);
      }
      resovle();
    }, 0);
  });
  return pokesData;
};

window.onload = async function () {
  try {
    const structuredPokesData = await fetchPokesData();
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};
