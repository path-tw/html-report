const fetchPokemonDetails = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const reverseResponse = await response.json();
        const data = reverseResponse.results;
        getPokemonDetails(data);
    } catch (error) {
        console.log('failed to render', error);
    }
};

const getPokemonDetails = (pokemonDetails) => {
    // console.log(pokemandetails);
    const fetchPromises = pokemonDetails.map(key => fetchCharacterDetailsAndAppend(key.url));
    Promise.all(fetchPromises)
    .catch(error => {
        console.error('Error fetching Pokémon details:', error);
    }); 
};

const fetchCharacterDetailsAndAppend = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        appendDetails(data);

    } catch (error) {
        console.log(error);
    }
};

const appendDetails = (pokemonData) => {
    const pokemonsContainer = document.getElementById('container');
    const pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon');

    const characterName = document.createElement('h4');
    characterName.textContent = 'NAME: ' + pokemonData.name;
    pokemonContainer.appendChild(characterName);

    const characterId = document.createElement('p');
    characterId.textContent = 'Id: ' + pokemonData.id;
    pokemonContainer.appendChild(characterId);

    const characterImage = document.createElement('img');
    characterImage.src = pokemonData.sprites.front_default; characterImage.alt = pokemonData.name;
    pokemonContainer.appendChild(characterImage);

    const characterType = document.createElement('p');
    characterType.textContent = 'Type: ' + pokemonData.types.map((pokemonType) => pokemonType.type.name);
    pokemonContainer.appendChild(characterType);

    pokemonsContainer.appendChild(pokemonContainer);
};

window.onload = () => {
    fetchPokemonDetails();
}








