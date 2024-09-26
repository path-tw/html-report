const fetchDetails = async (url, loadingpage) => {
    const pokemonsContainer = document.getElementById('mainpage');
    loadingpage.innerHTML = '';
    loadingpage.remove();
    try {
    const response = await fetch(url)
    const data = await response.json();
        const pokemonElement = document.createElement('div');
        pokemonElement.className = 'pokemon';
        pokemonElement.innerHTML = `
          <h2>${data.name}</h2>
          <p>ID: ${data.id}</p>
          <img src="${data.sprites.front_default}">
          <p>Type: ${data.types.map(type => type.type.name).join(', ')}</p>`;
          pokemonElement.style.textAlign = 'center';
        pokemonsContainer.appendChild(pokemonElement);
    } catch(error){
        console.log(error);
    }
};

const getPokemonDetails = (pokemons, loadingpage) => {
    pokemons.forEach(pokemon => {
        fetchDetails(pokemon.url, loadingpage);
    });
};

const renderPokemons = async () => {
    const pokemonsContainer = document.querySelector('#mainpage');
    const loadingpage = document.createElement('div');
    loadingpage.innerHTML = 'Loading...';
    pokemonsContainer.appendChild(loadingpage);
    try {
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon');
        const reverseResponse = await response.json();
        const data = reverseResponse.results;
        getPokemonDetails(data, loadingpage);
    } catch (error) {
        console.log('failed to render', error);
    }
};

window.onload = () => {
    renderPokemons ();
}