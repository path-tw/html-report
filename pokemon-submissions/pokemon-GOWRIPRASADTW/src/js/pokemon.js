'use strict';
const fetchPokemon = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const data = await response.json();
    displayPokemon(data.results);
}

const displayPokemon = async (pokemonList) => {
    const container = document.getElementById('container');

    for (const pokemon of pokemonList) {
        const response = await fetch(pokemon.url);
        const details = await response.json();
        const pokemonCard = `           
            <img src="${details.sprites.front_default}">
            <h2>${details.name}</h2>
            <p>ID: ${details.id}</p>
            <p>Type: ${details.type}</p>
        `;
        container.innerHTML += pokemonCard;
    }
}
fetchPokemon();
