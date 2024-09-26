'use strict';
async function fetchPokemonDetails() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1342');
  const data = await response.json();
  displayPokemondata(data.results);
}

async function displayPokemondata(pokemonList) {
  const container = document.getElementById('pokemon-container');
  for (const pokemon of pokemonList) {
    const pokemonImg = await fetch(pokemon.url);
    const pokemonDetails = await pokemonImg.json();
    const types = pokemonDetails.types.map(typeInfo => typeInfo.type.name).join(', ');
    const pokemonContainer = `
      <section class="pokemon">
        <img src="${pokemonDetails.sprites.front_default}" alt="${pokemonDetails.name}">
        <h4>${pokemonDetails.name}</h4>
        <div>ID: ${pokemonDetails.id}</div>
        <div>Type: ${types}</div>
      </section>`;
    container.innerHTML += pokemonContainer;
  }
}
const main = () => {
    setTimeout( () => {
        document.getElementById('popupMsg').style.display = "none";
        document.querySelector('.page-heading').style.display = 'block';
        fetchPokemonDetails();
    },5000);
  };
main();