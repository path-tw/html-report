'use strict';

const assignData =async (image, name, id, type) => {
    const img = document.createElement('img');
    const namecont = document.createElement('span');
    const idcont = document.createElement('span');
    const typecont = document.createElement('span');
    const container = document.querySelector('.pokemonData');
    const mainData = document.createElement('section');
    img.src = image? image: './src/images/pokeball.png';
    namecont.innerText ='Name:' + name;
    idcont.innerText ='Id:' + id;
    typecont.innerText ='Type:' + type;
    mainData.appendChild(img);
    mainData.appendChild(namecont);
    mainData.appendChild(idcont);
    mainData.appendChild(typecont);
    container.appendChild(mainData);
};

const getELement =async (element) => {
    const url = await fetch(element['url']);
    return url.json();
};

const createPokemonContainer =async (rawPokemonInfo) => {
  const allPokemonData = rawPokemonInfo['results'];
  const loader = document.querySelector('.loader');
  for (const element of allPokemonData) {
    const name = element['name'];
    const url = await getELement(element);
    const image = url['sprites']['front_default'];
    const id = url['id'];
    const type1 = url['types'][0]['type']['name'];
    const type2 = url['types'][1] ? url['types'][1]['type']['name'] : undefined;
    const type =type2 ? type1 + '/' +type2 : type1;
    assignData(image, name, id, type);
  }
  loader.style.display = 'none';
};

const searchPokemon = () => {
  const pokemonData = document.querySelector('.pokemonData');
  const allDataPokemon = pokemonData.querySelectorAll('section');
  const pokemonSearch = document.querySelector('.searchPokemon').value.toLowerCase();
  allDataPokemon.forEach((pokemon) => {
    const pokemonInfo = pokemon.querySelectorAll('span');
    if (pokemonInfo[0].innerText.toLowerCase().includes(pokemonSearch)) {
      // alert('name');
      pokemon.style.display = 'flex';
    } else if (pokemonInfo[1].innerText.toLowerCase().includes(pokemonSearch)) {
      // alert('id');
      pokemon.style.display = 'flex';
    } else if (pokemonInfo[2].innerText.toLowerCase().includes(pokemonSearch)) {
      // alert('type');
      pokemon.style.display = 'flex';
    } else {
      pokemon.style.display = 'none';
    }
  });
};

const pokemonFetch =async () => {
  const loader = document.querySelector('.loader');
  const fetchData = await fetch('https://pokeapi.co/api/v2/pokemon?limit=358&offset=0');
  const fetchResult = await fetchData.json();
  createPokemonContainer(fetchResult);
  loader.style.display = 'none';
};

window.onload = () => {
  const pokemonSearch = document.querySelector('.searchPokemon');
  pokemonFetch();
  pokemonSearch.addEventListener('input', searchPokemon);
};