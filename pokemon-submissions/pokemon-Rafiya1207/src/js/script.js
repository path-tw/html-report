const createPTag = (value, className, text) => {
  const pTag = document.createElement('p');
  pTag.innerText = `${text}: ${value}`;
  pTag.classList.add(`pokemon-${className}`);
  return pTag;
};

const createImageTag = (image) => {
  const imgTag = document.createElement('img');
  imgTag.src = image;
  imgTag.classList.add('pokemon-image');
  return imgTag;
};

const generatePokemonTypes = (types) => {
  const divTag = document.createElement('div');
  divTag.innerText = 'Types: ';
  types.forEach(element => {
    const spanTag = document.createElement('span');
    spanTag.innerText = `${element}, `;
    divTag.appendChild(spanTag);
  });
  return divTag;
};

const createAndAppendPokemonCard = (name, id, types, image) => {
  const divTagForCard = document.createElement('div');
  const imgTag = createImageTag(image);
  const pTagForName = createPTag(name, 'name', 'Name');
  const pTagForId = createPTag(id, 'id', 'Id');
  const divTagForTypes = generatePokemonTypes(types);
  divTagForCard.classList.add('card')
  divTagForCard.append(imgTag, pTagForName, pTagForId, divTagForTypes);
  return divTagForCard;
}

const fetchPokemonDetails = async () => {
  const mainTag = document.querySelector('main');
  const container = document.createElement('div');
  container.classList.add('container');
  const url = 'https://pokeapi.co/api/v2/pokemon/';
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
    const parsedResponse = await response.json();
    const data = parsedResponse.results;
    for (let index = 1; index <= data.length; index++) {
      const otherDetails = await fetch(`${url}${index}/`);
      const parsedDetails = await otherDetails.json();
      const pokemonName = data[index - 1].name;
      const pokemonId = parsedDetails.id;
      const pokemonTypes = [];
      parsedDetails.types.forEach(element => {
        pokemonTypes.push(element.type.name);
      });
      const pokemonImage = parsedDetails.sprites.front_default;
      const card = createAndAppendPokemonCard(pokemonName, pokemonId, pokemonTypes, pokemonImage);
      container.appendChild(card);
    }
    mainTag.innerHTML = '';
    mainTag.appendChild(container);
  } catch (error) {
    console.error(error);
  }
}

const loader = () => {
  const pTag = document.createElement('p');
  pTag.classList.add('loader');
  pTag.innerText = 'loading....';
  const container = document.querySelector('.container');
  container.appendChild(pTag);
};

window.onload = () => {
  loader();
  fetchPokemonDetails();
};