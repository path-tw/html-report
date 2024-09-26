'use strict';

const fetchPokemonApi = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data = await response.json();
        const pokemonArray = data.results.map(async (pokemon) => {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();
            const pokemonInfo = {
                id: pokemonData.id, name: pokemonData.name, type: pokemonData.types[0].type.name,
                image: pokemonData.sprites.front_default
            };
            return pokemonInfo;
        });
        const pokemonDetails = await Promise.all(pokemonArray);
        return pokemonDetails;
    } catch (error) {
        console.log('fetching error:', error);
    }
};

const createDiv = (pokemon) => {
    const pokemonId = document.createElement('p');
    pokemonId.textContent = pokemon.id;
    const pokemonType = document.createElement('p');
    pokemonType.textContent = pokemon.type;
    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.image;
    pokemonImage.alt = pokemon.name;
    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name;
    return appendedPokemonDetais(pokemonId, pokemonType, pokemonImage, pokemonName);
};

const appendedPokemonDetais = (pokemonId, pokemonType, pokemonImage, pokemonName) => {
    const outerDiv = document.getElementById('pokemonImages');
    const pokemonDiv = document.createElement('div');
    pokemonDiv.classList.add('innerDiv');
    pokemonDiv.appendChild(pokemonId);
    pokemonDiv.appendChild(pokemonType);
    pokemonDiv.appendChild(pokemonImage);
    pokemonDiv.appendChild(pokemonName);
    outerDiv.appendChild(pokemonDiv);
};

const renderPokemonApi = async () => {
    const pokemonDetails = await fetchPokemonApi();
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'none';
    for (let index = 0; index < pokemonDetails.length; index++) {
        createDiv(pokemonDetails[index]);
    }
};

renderPokemonApi();
