'use strict';

// const storeDetailsForSearch = () => {
//         let detailscontainer = [];
//         const name = pokemonsContainer.querySelector('h2').innerText;
//         const id = pokemonsContainer.querySelector('p:nth-child(1)').innerText;
//         const types = pokemonsContainer.querySelector('p:nth-child(2)').innerText;
//         detailscontainer.push(name, id, types);
//         console.log(detailscontainer);
// };

const searchFunctioning = () => {
    const container = document.getElementsByClassName('pokemon');
    const search = document.querySelector('#search');
    search.addEventListener('input', () => {
        for (let index = 0; index < container.length; index++) {
            const separateDiv = container[index];
            if (separateDiv.innerText.toLowerCase().includes(search.value)) {
                separateDiv.style.display = 'block';
            } else {
                separateDiv.style.display = 'none';
            }
        }
    })
};

const appendChilderns  = (names, id, image, types, pokemonDIv) => {
    const pokemonsContainer = document.getElementById('mainpage');
    pokemonDIv.style.textAlign = 'center';
    pokemonDIv.appendChild(names);
    pokemonDIv.appendChild(id);
    pokemonDIv.appendChild(image);
    pokemonDIv.appendChild(types);
    pokemonsContainer.appendChild(pokemonDIv);
}

const displayData = (data, loadingpage) => {
    loadingpage.innerHTML = '';
    loadingpage.remove();
    const pokemonDIv = document.createElement('div');
    pokemonDIv.className = 'pokemon';
    const names = document.createElement('h2');
    names.innerText = `${data.name}`;
    const id = document.createElement('p');
    id.innerText = `ID: ${data.id}`;
    const image = document.createElement('img');
    image.src = `${data.sprites.front_default}`;
    const types = document.createElement('p');
    types.innerText = `type: ${data.types.map(type => type.type.name).join(', ')}`;
    appendChilderns(names, id, image, types, pokemonDIv);
}

const fetchDetails = async (url, loadingpage) => {
    try {
        const response = await fetch(url)
        const data = await response.json();
        displayData(data, loadingpage);
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
        const response = await fetch ('https://pokeapi.co/api/v2/pokemon?limit=359&offset=0');
        const reverseResponse = await response.json();
        const data = reverseResponse.results;
        getPokemonDetails(data, loadingpage);
    } catch (error) {
        console.log('failed to render', error);
    }
};

window.onload = () => {
    renderPokemons ();
    searchFunctioning();
}