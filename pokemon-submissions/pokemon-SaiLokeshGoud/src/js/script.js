'use strict';

const fetchPokemonName = (pokemonResults, i) => {
  const name = pokemonResults[i].name;
  const pokemonName = document.createElement('h1');
  pokemonName.className = 'pokemon-name';
  pokemonName.innerText = `Name: ${name}`;
  return pokemonName;
}

const fetchPokemonImage = (pokemonsDetails) => {
  const pokemonImage = pokemonsDetails.sprites.front_default; 
  const imageDiv = document.createElement('div');
  const image = document.createElement('img');
  image.className = 'pokemon-images'
  image.src = pokemonImage || 'src/images/pokemon-logo-black-transparent.png';
  imageDiv.appendChild(image);
  imageDiv.className = 'pokemon-images-div';
  return imageDiv;
}

const fetchPokemonId = (pokemonsDetails) => {
  const pokemonId = pokemonsDetails.id; 
  const id = document.createElement('h3');
  id.innerText = `Id: ${pokemonId}`;
  return id;
}

const fetchPokemonType = (pokemonsDetails) => {
  const pokemonType = pokemonsDetails.types?.[0]?.type?.name;
  const type = document.createElement('h3');
  type.innerText = `Type: ${pokemonType}`;
  return type;
}

const displayPokemons = async (pokemonResults) => {
  for (let i = 0; i < pokemonResults.length; i++) {
    const main = document.querySelector('#main');
    const pokemon = document.createElement('div');
    pokemon.className = 'pokemon';
    
    try {
      const fetchPokemonsDetails = await fetch(pokemonResults[i].url)
        .then(response => response.json())
        .catch((error) => {
          throw new Error(`Failed to fetch details for ${pokemonResults[i].name}: ${error.message}`);
        });
      
      const pokemonsDetails = fetchPokemonsDetails;
      
      const pokemonName = fetchPokemonName(pokemonResults, i);
      const pokemonType = fetchPokemonType(pokemonsDetails);
      const pokemonId = fetchPokemonId(pokemonsDetails);
      const pokemonImage = fetchPokemonImage(pokemonsDetails);
      
      pokemon.append(pokemonImage, pokemonName, pokemonId, pokemonType);
      main.appendChild(pokemon);
    } catch (error) {
      console.error(`Error fetching Pokemon details for ${pokemonResults[i].name}: ${error.message}`);
    }
  }
};

const showLoader = () => {
  const loading = document.createElement('div');
  const loadingText = document.createElement('h1');
  const loadAnimation = document.createElement('p');
  loadingText.innerText = 'Loading Pokemons';
  loading.id = 'loading';
  loadAnimation.id = 'loadAnimation';
  const body = document.querySelector('body');
  loading.append(loadingText, loadAnimation);
  body.appendChild(loading);
};

const hideLoader = () => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.remove();
  }
  document.querySelector('#main').style.display = 'flex';
};

const fetchPokemons = async () => {
  try {
    const pokemonApiLink = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const fetchPokemonsData = await fetch(pokemonApiLink);
    const pokemonList = await fetchPokemonsData.json();
    const pokemonResults = pokemonList.results;
    await displayPokemons(pokemonResults);
  } catch (error) {
    console.error(`Error fetching Pokemon list: ${error.message}`);
  } finally {
    hideLoader();
  }
}

window.onload = () => {
  showLoader();
  fetchPokemons();
}
