'use strict';
const fetchPokemon = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const data = await response.json();
  displayPokemon(data.results);
};

const displayPokemon = async (pokemonData) => {
  const container = document.getElementById('container');
  for (const pokemon of pokemonData) {
    const response = await fetch(pokemon.url);
    const details = await response.json();       
    const pokemons = `     
      <div class="detail">
        <img src="${details.sprites.front_default}">
        <h2>${details.name}</h2>
        <p>ID: ${details.id}</p>
        <p>Type: ${details.types.map(fetchType => fetchType.type.name).join(', ')}</p
      </div>
    `;
    container.innerHTML += pokemons;
  }
};

// const loader = () =>{
//   setTimeout(() => {
//     const loader = document.getElementById('Loader');
//     loader.innerText = '';
    fetchPokemon();
//   }, 2000)
// };

