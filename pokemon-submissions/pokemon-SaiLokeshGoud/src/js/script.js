'use strict';

const fetchPokemonName = (pokemonResults,i) => {
  const name = pokemonResults[i].name;
  const pokemonName = document.createElement('h1');
  pokemonName.className = 'pokemon-name';
  pokemonName.innerText = `Name: ${name}`;
  return pokemonName;
}

const fetchPokemonImage = (pokemonsDetails) => {
  const pokemonImage = pokemonsDetails.sprites.back_default;
  const image = document.createElement('img');
  image.src = `${pokemonImage}`;
  image.className = 'pokemon-images';
  return image;
}

const fetchPokemonId = (pokemonsDetails) => {
  const pokemonId = pokemonsDetails.id;
  const id = document.createElement('h3');
  id.innerText = `Id: ${pokemonId}`;
  return id;
}

const fetchPokemonType = (pokemonsDetails) => {
  const pokemonType = pokemonsDetails.types[0].type.name;
  const type = document.createElement('h3');
  type.innerText = `Type: ${pokemonType}`;
  return type;
}

const displayPokemons = async (pokemonResults) => {
  for (let i = 0; i < pokemonResults.length; i++) {
    const main = document.querySelector('#main');
    const pokemon = document.createElement('div');
    pokemon.className = 'pokemon';
    const fetchPokemonsDetails = await fetch(pokemonResults[i].url);
    const pokemonsDetails = await fetchPokemonsDetails.json();
    const pokemonName = fetchPokemonName(pokemonResults,i);
    const pokemonType = fetchPokemonType(pokemonsDetails);
    const pokemonId = fetchPokemonId(pokemonsDetails)
    const pokemonImage = fetchPokemonImage(pokemonsDetails);
    pokemon.append(pokemonImage, pokemonName, pokemonId, pokemonType);
    main.appendChild(pokemon);
  }
}

const fetchPokemons = async () => {
  const pokemonApiLink = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
  const fetchPokemonsData = await fetch(pokemonApiLink);
  const pokemonList = await fetchPokemonsData.json();
  console.log(pokemonList)
  const pokemonResults = pokemonList.results;
  displayPokemons(pokemonResults);
}
fetchPokemons();
