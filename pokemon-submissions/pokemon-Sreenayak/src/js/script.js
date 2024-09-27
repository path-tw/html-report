const pokemonContainer = document.getElementById('pokemonContainer');

async function fetchPokemons() {
    for (let i = 1; i <= 1350; i++) { 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        displayPokemon(data);
    }
}

function displayPokemon(pokemon) {
    const pokemonBox = document.createElement('div');
    pokemonBox.classList.add('pokemon-box');

    const pokemonImage = document.createElement('img');
    pokemonImage.src = pokemon.sprites.front_default;

    const pokemonName = document.createElement('div');
    pokemonName.classList.add('pokemon-name');
    pokemonName.textContent = `Name: ${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}`;

    const pokemonId = document.createElement('div');
    pokemonId.textContent = `ID: ${pokemon.id}`;

    const pokemonTypes = document.createElement('div');
    pokemonTypes.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;

    pokemonBox.appendChild(pokemonImage);
    pokemonBox.appendChild(pokemonName);
    pokemonBox.appendChild(pokemonId);
    pokemonBox.appendChild(pokemonTypes);

    pokemonContainer.appendChild(pokemonBox);
}

fetchPokemons();
