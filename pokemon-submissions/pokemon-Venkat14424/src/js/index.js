async function fetchPokemons() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=200');
  const data = await response.json();
  console.log(data);
  data.results.forEach((pokemon) => {
    displayPokemon(pokemon.url);
  });
}

const displayPokemon = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const pokemonContainer = document.getElementById('pokemonContainer');
  const pokemonData = document.createElement('section');
  const pokemonImg = document.createElement('img');
  const pokemonId = document.createElement('p');
  const pokemonName = document.createElement('p');
  const pokemonTypes = document.createElement('p');
  pokemonName.innerHTML = "Name: " + data.name;
  pokemonImg.setAttribute('src', data.sprites.front_default);
  pokemonId.innerHTML = "ID: " + data.id;
  pokemonTypes.innerHTML = "Types: " + data.types.map(type => type.type.name).join(', ');
  pokemonData.appendChild(pokemonImg);
  pokemonData.appendChild(pokemonId);
  pokemonData.appendChild(pokemonName);
  pokemonData.appendChild(pokemonTypes);
  pokemonContainer.appendChild(pokemonData);
}
window.onload = fetchPokemons;
