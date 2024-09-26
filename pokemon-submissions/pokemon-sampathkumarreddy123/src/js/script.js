
'use strict';

const getAllPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
  const allPokemons = await response.json();
  return allPokemons.results;
};

const getPokemonDetails = async (url) => {
  const response = await fetch(url);
  const pokemonDetails = await response.json();
  return pokemonDetails;
};

const createPokemonNameElement = (name) => {
  const displayPokemonName = document.createElement('h3');
  displayPokemonName.innerText = `Name : ${name}`;
  return displayPokemonName;
};

const createPokemonIdElement = (id) => {
  const pokemonId = document.createElement('p');
  pokemonId.innerText = `ID : ${id}`;
  return pokemonId;
};


const createPokemonTypeElement = (types) => {
  const pokemonType = document.createElement('p');
  pokemonType.innerText = `Type : ${types[0].type.name}`; 
  return pokemonType;
};

const createPokemonImageElement = (imageUrl) => {
  const image = document.createElement('img');
  image.className = 'image';
  image.src = imageUrl;
  return image;
};


const createPokemonCard = (pokemonData, pokemonDetails) => {
  const allPokemonsDetails = document.getElementById('allPokemonsDetails');
  const pokemonContainer = document.createElement('div');
  pokemonContainer.className = 'pokemonContainer';
  const pokemonNameElement = createPokemonNameElement(pokemonData.name);
  const pokemonIdElement = createPokemonIdElement(pokemonDetails.id);
  const pokemonTypeElement = createPokemonTypeElement(pokemonDetails.types);
  const pokemonImageElement = createPokemonImageElement(pokemonDetails.sprites.front_default);
  pokemonContainer.append(pokemonImageElement);
  pokemonContainer.append(pokemonIdElement);
  pokemonContainer.append(pokemonNameElement);
  pokemonContainer.append(pokemonTypeElement);
  allPokemonsDetails.appendChild(pokemonContainer);
};

const fetchPokemon = async () => {
  try {
    const allPokemons = await getAllPokemons();
    
    for (let index = 0; index < allPokemons.length; index++) {
      const pokemonData = allPokemons[index];
      const pokemonDetails = await getPokemonDetails(pokemonData.url);
      createPokemonCard(pokemonData, pokemonDetails);
    }
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
};

fetchPokemon();
