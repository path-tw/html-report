// https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0 All Pokemons for name nad id
// https://pokeapi.co/api/v2/pokemon/ditto name search
let pokemonCollection;


const fetchWithLink = async (link) => {
  const response = await fetch(link);
  const data = await response.json();
  return data;
};


const createPTag = (text, classname) => {
  const pTag = document.createElement('p');
  pTag.innerText = text;
  pTag.classList.add(classname);
  return pTag;
};

const createImgTag = (url, classname) => {
  const imgTag = document.createElement('img');
  imgTag.src = url;
  imgTag.classList.add(classname);
  return imgTag;
};

const createPokemonCard = (details) => {
  const container = document.createElement('div');
  container.className = 'pokemonCard';
  const image = createImgTag(details.image, 'image');
  const id = createPTag('id : ' +details.id, 'id');
  const name = createPTag('Name : ' + details.name, 'name');
  const type = createPTag('Type : ' + details.type, 'type');
  container.append(image, id, name, type);
  return container;
};

const getPokemonByName = async (name) => {
  return await fetchWithLink(`https://pokeapi.co/api/v2/pokemon/${name}`);
};

const renderPokemon = async (pokemonName) => {
  const newPokemon = await getPokemonByName(pokemonName);
  const details = {
    image: newPokemon.sprites.front_shiny,
    id: newPokemon.id,
    name: newPokemon.name,
    type: newPokemon.types[0].type.name
  };
  document.querySelector('#all-pokemons')
    .append(createPokemonCard(details));
};

const fetchAllPokemons = async () => {
  const data = await fetchWithLink('https://pokeapi.co/api/v2/pokemon?limit=1400&offset=0');
  const allPokemonNames = data.results.map(pokemon => pokemon.name);
  pokemonCollection = await allPokemonNames.map(renderPokemon);
  return allPokemonNames;
};



const createLoader = () => {
  const loaderContainer = document.createElement('div');
  loaderContainer.id = 'loader-background';
  const loader = document.createElement('div');
  loader.id = 'loader';
  loaderContainer.append(loader)
  return loaderContainer;
};

const setLoader = () => {
  const loader = createLoader();
  const main = document.querySelector('#main');
  console.log(main)
  main.append(loader);
}


window.onload = () => {
  setLoader();
  fetchAllPokemons().then(()=> {
    document.querySelector('#loader-background').remove();
  })

}