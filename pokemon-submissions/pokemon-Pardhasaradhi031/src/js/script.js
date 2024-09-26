'use strict';

const createPokemonContainer = function (name, id, image, type) {
  const mainSection = document.getElementById('pokemonSection');
  const pokemonContainer = document.createElement('div');
  pokemonContainer.id = 'pokemon';
  const imageContainer = document.createElement('img');
  imageContainer.src = image;
  const detailsContainer = document.createElement('div');
  detailsContainer.innerText = `Name: ${name}\nID: ${id}\nType: ${type}`;
  pokemonContainer.append(imageContainer, detailsContainer);
  mainSection.append(pokemonContainer);
};

const fetchTotalPokemonCount = async function () {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=0');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching Pokémon count:', error);
    return 0;
  }
};

const fetchAllPokemonData = async function () {
  const totalPokemon = await fetchTotalPokemonCount();
  for (let index = 1; index <= totalPokemon; index++) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);
      const data = await response.json();
      const pokemonName = data.name;
      const pokemonId = data.id;
      const pokemonImage = data.sprites.front_default;
      const pokemonTypes = data.types[0].type.name;
      createPokemonContainer(pokemonName, pokemonId, pokemonImage, pokemonTypes);
    } catch (error) {
      console.error(`Error fetching Pokémon number ${index}:`, error);
    }
  }
};
const showLoadPopup = function () {
  const load = document.createElement('div');
  const main = document.getElementById('pokemonSection');
  load.innerText = 'Loading...';
  document.body.append(load);
  load.id = 'showLoading';
  main.style.display = 'none';
  setTimeout(() => {
    main.style.display = 'flex';
    load.style.display = 'none';
  }, 5000)
};

window.onload = async () => {
  showLoadPopup();
  await fetchAllPokemonData();
};
