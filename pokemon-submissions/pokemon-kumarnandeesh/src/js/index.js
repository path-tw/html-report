'use strict'

const toAppendName = (name) => {
    const nameContainer = document.createElement('h3');
    nameContainer.innerText = name;
    return nameContainer;
};

const toAppendId = (id) => {
    const idContainer = document.createElement('p');
    idContainer.innerText = `ID : ${id}`;
    return idContainer;
};

const toAppendImage = (url) => {
    const imageContainer = document.createElement('img');
    imageContainer.src = url;
    imageContainer.style.display = 'flex';
    return imageContainer;
};

const toAppendTypes = (type) => {
    const typeContainer = document.createElement('div');
    const array = [];
    for (let index = 0; index < type.length; index++) {
        const typeName = type[index].type.name;
        array.push(typeName);
        const typeElement = document.createElement('span');
        typeElement.innerText = typeName;
        typeContainer.appendChild(typeElement);
        if (index < type.length - 1) {
            const comma = document.createElement('span');
            comma.innerText = ', ';
            typeContainer.appendChild(comma);
        }
    }
    return typeContainer;
};



const toFetchApi = async () => {
    const mainContainer = document.getElementById('main');
    const pokemon = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const pokemonData = await pokemon.json();
    for (let index = 0;index < pokemonData.results.length; index++) {
        const pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemonContainer');

        const pokemonName = pokemonData.results[index].name;
        pokemonContainer.appendChild(toAppendName(pokemonName));

        const pokemonDetails = await fetch(pokemonData.results[index].url);
        const data = await pokemonDetails.json();

        const image = data.sprites.front_default;
        pokemonContainer.appendChild(toAppendImage(image));

        const pokemonId = data.id;
        pokemonContainer.appendChild(toAppendId(pokemonId));

        
        const type = data.types;
        pokemonContainer.appendChild(toAppendTypes(type));
        
        mainContainer.appendChild(pokemonContainer);
    }
}

const forLoading = async () => {

}

const search = () => {
    const searchData = document.getElementById('searchBar').value.toLowerCase();
    const pokemonSearch = document.querySelectorAll('.pokemonContainer');

    pokemonSearch.forEach(container => {
        const nameText = container.querySelector('h3').innerText.toLowerCase();
        const idNumber = container.querySelector('p').innerText;
        const typeName = container.querySelector('div').innerText;
        const searchResults = (nameText.includes(searchData) || idNumber.includes(searchData) || typeName.includes(searchData));
        container.style.display = searchResults ? '' : 'none';
    });
}


window.onload = () => {
    toFetchApi();
    document.getElementById('searchBar').addEventListener('input' ,search);
};
