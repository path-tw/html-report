const createPTag = (value, className, text) => {
  const pTag = document.createElement('p');
  pTag.innerText = `${text}: ${value}`;
  pTag.classList.add(`pokemon-${className}`);
  return pTag;
};

const createImageTag = (image) => {
  const imgTag = document.createElement('img');
  imgTag.setAttribute('src', image);
  imgTag.classList.add('pokemon-image');
  return imgTag;
};

const generatePokemonTypes = (types) => {
  const divTag = document.createElement('div');
  divTag.innerText = 'Types: ';
  const spanTag = document.createElement('span');
  types.forEach(element => {
    spanTag.innerText += `${element}- `;
  });
  divTag.appendChild(spanTag);
  return divTag;
};

const AppendPokemonCard = (name, id, types, image) => {
  const divTagForCard = document.createElement('div');
  const divTagForDetails = document.createElement('div');
  const imgTag = createImageTag(image);
  const pTagForName = createPTag(name, 'name', 'Name');
  const pTagForId = createPTag(id, 'id', 'Id');
  const divTagForTypes = generatePokemonTypes(types);
  divTagForCard.classList.add('card');
  divTagForDetails.append(pTagForName, pTagForId, divTagForTypes);
  divTagForDetails.classList.add('pokemon-details');
  divTagForCard.append(imgTag, divTagForDetails);
  return divTagForCard;
}

const pokemons = [];

const fetchAndStorePokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
  const parsedResponse = await response.json();
  const data = parsedResponse.results;
  for (let index = 1; index <= data.length; index++) {
    const otherDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}/`);
    const parsedDetails = await otherDetails.json();
    const pokemon = {};
    pokemon['image'] = parsedDetails.sprites.front_default;
    pokemon['name'] = data[index - 1].name;
    pokemon['id'] = parsedDetails.id;
    pokemon['types'] = [];
    parsedDetails.types.forEach(element => {
      pokemon['types'].push(element.type.name);
    });
    pokemons.push(pokemon);
  }
};

const renderPokemons = async (pokemons) => {
  const mainTag = document.querySelector('main');
  const container = document.createElement('div');
  container.classList.add('container');
  for (let index = 0; index < pokemons.length; index++) {
    const card = AppendPokemonCard(pokemons[index]['name'], pokemons[index]['id'], pokemons[index]['types'], pokemons[index]['image']);
    container.appendChild(card);
  }
  mainTag.innerHTML = '';
  mainTag.appendChild(container);
}

const loader = () => {
  const pTag = document.createElement('p');
  pTag.classList.add('loader');
  pTag.innerText = 'loading....';
  const container = document.querySelector('.container');
  container.appendChild(pTag);
};

window.onload = async () => {
  loader();
  await fetchAndStorePokemons();
  renderPokemons(pokemons);
};