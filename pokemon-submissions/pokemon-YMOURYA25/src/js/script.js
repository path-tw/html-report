window.onload = () => {
    loadingmessage();
    pokemonfetch();
};

const loadingmessage = () => {
    const main = document.getElementById('main-container');
    const loadingMessage = document.createElement('h2');
    loadingMessage.id = 'loading-message';
    loadingMessage.innerText = 'Loading..';
    main.appendChild(loadingMessage);
};

const removeLoadingMessage = () => {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
};

const pokemonfetch = async () => {
    const rootUrl = 'https://pokeapi.co/api/v2/pokemon';
    let i = 1;
    try {
        const response = await fetch(`${rootUrl}?limit=100000&offset=0`);
        const pokemons = await response.json();
        const totalPokemons = pokemons.results.length;
        console.log(totalPokemons);

        removeLoadingMessage();

        for (i = 1; i <= totalPokemons; i++) {
            pokemonDataFetch(i, rootUrl);
        }
    } catch (error) {
        console.error(error);
    }
};

const createDivAndItsElementsAppendToMain = (src, name, id, type) => {
    const main = document.getElementById('main-container');
    const div = document.createElement('div');
    div.className = 'pokemon-container';
    const img = createImage(src);
    const pokemonName = createDetail(name, 'pokemon-name', 'h1');
    const pokemonId = createDetail(`Id: ${id}`, 'pokemon-id');
    const pokemonType = createDetail(`Type: ${type}`, 'pokemon-type');
    div.append(img, pokemonName, pokemonId, pokemonType);
    main.appendChild(div);
};

const createImage = (src) => {
    const img = document.createElement('img');
    img.src = src || 'https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png';
    img.className = 'pokemon-image';
    return img;
};


const createDetail = (info, className, tag = 'p') => {
    const detail = document.createElement(tag);
    detail.innerText = info;
    detail.className = className;
    return detail;
};

const pokemonDataFetch = async (pokemonNumber, rootUrl) => {
    try {
        const response = await fetch(`${rootUrl}/${pokemonNumber}/`);
        const pokemonData = await response.json();
        const pokemonName = pokemonData.name;
        const pokemonId = pokemonData.id;
        const pokemonType = pokemonData.types.map(item => item.type.name).join(', ');
        const pokemonImage = pokemonData.sprites.back_shiny;
        createDivAndItsElementsAppendToMain(pokemonImage, pokemonName, pokemonId, pokemonType);
    } catch (error) {
        console.error(error);
    }
};
