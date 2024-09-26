'use strict';

const assignData = (image, name, id, type) => {
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
  for (const element of allPokemonData) {
    const name = element['name'];
    const url = await getELement(element);
    const image = url['sprites']['front_details'];
    const id = url['id'];
    const type1 = url['types'][0]['type']['name'];
    const type2 = url['types'][1] ? url['types'][1]['type']['name'] : undefined;
    const type =type2 ? type1 + '/' +type2 : type1;
    document.querySelector('.loader').style.display = 'none';
    assignData(image, name, id, type);
  }
};

const pokemonFetch =async () => {
  const fetchData = await fetch('https://pokeapi.co/api/v2/pokemon-form/');
  const fetchResult = await fetchData.json();
  createPokemonContainer(fetchResult);
};

window.onload = () => pokemonFetch();