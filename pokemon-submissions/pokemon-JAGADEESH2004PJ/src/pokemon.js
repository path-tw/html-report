const fetchConvertData = async (url) => {
  try {
    const response = await fetch(url);
    const pokemonData = await response.json();
    return pokemonData;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

const fetchAllPokemons = async () => {
  const allPokemons = [];
  try {
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset';
    const data = await fetchConvertData(apiUrl);
    console.log(data);
    for (const pokemon of data.results) {
       allPokemons.push(pokemon);
    }
    appendToDom(allPokemons);
  } catch(error) {
    console.log(`Error : ${error}`);
  }
};

const appendToDom = async (allPokemons) => {
  console.log(allPokemons);
try {
  for (const pokemon of allPokemons) {
    const data = await fetchConvertData(pokemon.url);
    const card = document.createElement('div');
    card.className = 'pokemonCard';
    createAndAppend(data, card);
  }
} catch (error) {
  console.log('Failed to load Pokémon data:', error);
  } finally {
  document.getElementById('loading').style.display = 'none';
  }
};

const createAndAppend = async (pokemonData, pokemonCard) => {
  const pokemonName = document.createElement('h2');
  pokemonName.textContent = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
  const id = document.createElement('p');
  id.textContent = `ID: ${pokemonData.id}`;
  const img = document.createElement('img');
  img.src = pokemonData.sprites.front_default;
  img.alt = pokemonData.name;
  const types = document.createElement('p');
  types.textContent = `Types: ${pokemonData.types[0].type.name}`;

  pokemonCard.appendChild(pokemonName);
  pokemonCard.appendChild(id);
  pokemonCard.appendChild(img);
  pokemonCard.appendChild(types);

  document.getElementById('pokemonList').appendChild(pokemonCard);
}



fetchAllPokemons();