
const fetchPokemons = async () => {
  const pokemonsResponse = await fetch('https://pokeapi.co/api/v2/pokemon');
  const pokemonsData = await pokemonsResponse.json();
  const pokemons = pokemonsData.results;
  var array = [];
  for(const pokemon of pokemons) {
    const pokemonResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonResponse.json();
    const object = {
      name: pokemon.name,
      id: pokemonData.id,
      type: pokemonData.types[0].type.name,
      imageUrl: pokemonData.sprites.front_default
    }
    array.push(object);
  };
  return new Promise((resolve, reject) => {
    resolve(array)
  });
};

const createType = (type) => {
  const typeContainer = document.createElement('p');
  typeContainer.innerText = type;
  return typeContainer;
};

const createId = (id) => {
  const idContainer = document.createElement('p');
  idContainer.innerText = id;
  return idContainer;
};

const createImage = (image) => {
  const imageContainer = document.createElement('img');
  imageContainer.src = image;
  return imageContainer;
};

const createName = (name) => {
  const nameContainer = document.createElement('h2');
  nameContainer.innerText = name;
  return nameContainer;
};

const createPokemonContainer = (pokemon) => {
  const body = document.body;
  const container = document.createElement('div');
  container.classList.add('pokemon-container');
  container.appendChild(createName(pokemon.name));
  container.appendChild(createImage(pokemon.imageUrl));
  container.appendChild(createId(pokemon.id));
  container.appendChild(createType(pokemon.type));
  body.appendChild(container);
};

const start = async () => {
  try {
    const array = await fetchPokemons();
    array.forEach(pokemon => {
      createPokemonContainer(pokemon);
    })
  }
  catch (err) { console.log(err) };
};
window.onload = start;
