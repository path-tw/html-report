function fetchUrlData() {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1320';
  fetchPokemonList(apiUrl);
}

function fetchPokemonList(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonPromises = data.results.map(pokemon => fetchPokemonData(pokemon.url));
      return Promise.all(pokemonPromises);
    })
    .catch(error => handleFetchError(error));
}

function fetchPokemonData(url) {
  return fetch(url)
    .then(response => response.json())
    .then(pokemonData => displayPokemon(pokemonData))
    .catch(error => console.error('Error fetching Pokémon details:', error));
}

function displayPokemon(pokemonData) {
  const pokemonName = pokemonData.name;
  const pokemonImage = pokemonData.sprites.front_default;
  const pokemonId = pokemonData.id;
  const types = pokemonData.types.map(eachType => eachType.type.name)
  addingData(pokemonName,pokemonImage,pokemonId,types);
}
const addingData = function (pokemonName,pokemonImage,pokemonId,types) {
  const imageElement = document.createElement('img')
  const nameElement =  document.createElement('h1');
  const idElement = document.createElement('p');
  const typesElement =document.createElement('p');
  imageElement.src = pokemonImage;
  nameElement.innerText = `Name: ${pokemonName}`;
  idElement.innerText =`Id :${pokemonId}`;
  typesElement.innerText = `Type: ${types}`;
  const newPokemonDiv = document.createElement('div')
  newPokemonDiv.classList.add('newPokemon')
  appendElements(imageElement,nameElement,idElement,typesElement,newPokemonDiv);
};
 const appendElements = function (imageElement,nameElement,idElement,typesElement,newPokemonDiv) {
  const pokemonContainer = document.getElementById('pokemon-container');
  newPokemonDiv.appendChild(imageElement);
  newPokemonDiv.appendChild(nameElement);
  newPokemonDiv.appendChild(idElement);
  newPokemonDiv.appendChild(typesElement);
  pokemonContainer.appendChild(newPokemonDiv);
 };

function handleFetchError(error) {
  console.error('Error fetching Pokemon data:', error);
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.innerHTML = 'Failed to load data. Please try again later.';
}
window.onload = function () {
  const loading = document.getElementById('loadingLogo');
  setTimeout(() => {
  loading.style.display = 'none';
  }, 3000);
}
fetchUrlData();