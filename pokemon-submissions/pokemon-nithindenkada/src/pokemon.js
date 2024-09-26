const fetchPokemonDetails = async () => {
    try {
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
        const reverseResponse = await response.json();
        const data = reverseResponse.results;
        getPokemonDetails(data);
    } catch (error) {
        console.log('failed to render', error);
    }
};


const getPokemonDetails = (pokemandetails) => {
    pokemandetails.forEach(pokemon => {
        fetchCharacterDetails(pokemon.url);
    });
};

const fetchCharacterDetails = async (url) => {
    const pokemonsContainer = document.getElementById('container');
    try{
  const response = await fetch(url);
  const data = await response.json();
  const pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon');
  pokemonElement.innerHTML = `
    <h2>${data.name}</h2>
    <p>ID: ${data.id}</p>
    <img src="${data.sprites.front_default}">
    <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>`;
    pokemonElement.style.textAlign = 'center';
  pokemonsContainer.appendChild(pokemonElement);
  
    } catch (error){
        console.log(error);
    }
};

window.onload = () => {
    fetchPokemonDetails();
}








