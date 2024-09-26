let id = 0;
window.onload = () => {
  const pokedex = document.getElementById('pokemons')
  pokedex.innerText = 'Loading...';
  loadPokemons();
};

const getType = async (id) => {
  const types = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}`)
  const typeData = await types.json();
  const image = typeData.sprites.front_default;
  const numberOfTypes = [];
  const x = typeData.types.map(types => {
    numberOfTypes.push(types.type.name);
  })
  return {
    id: id,
    type: numberOfTypes,
    imagesrc : image
  };
};

const createCard = (pokemon) => {
  const pokeCard = document.createElement('div');
    const name = document.createElement('h3');
    const id = document.createElement('p');
    const type = document.createElement('p');
    const image = document.createElement('img');
    image.src = pokemon.imagesrc;
    pokeCard.className = 'pokeCard';
    name.textContent = pokemon.name;
    id.textContent = `Id: ${pokemon.id}`;
    type.textContent = `Type: ${pokemon.type}`;
    pokeCard.append(name,id,image,type);
    return pokeCard;
};

const createPokeCard = (pokemons) => {
  const pokedex = document.getElementById('pokemons')
  pokedex.innerText = '';
  pokemons.map(pokemon => {
    const pokeCard = createCard(pokemon);
    pokedex.append(pokeCard)
  });
};

const loadPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0')
  const data = await response.json();
  const pokemons = await Promise.all(data.results.map(async pokemon => {
    id = id + 1;
    const typeData =  await getType(id);
    return {
      name: pokemon.name,
      id: typeData.id,
      type: typeData.type,
      imagesrc: typeData.imagesrc
    };
  }));
  createPokeCard(pokemons);
};
