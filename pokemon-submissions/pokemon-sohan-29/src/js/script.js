let id = 1;
window.onload = () => {
  loadPokemons();
}

const getType = async () => {
  const types = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${id}`)
  const typeData = await types.json();
  const numberOfTypes = [];
  const x = typeData.types.map(types => {
    numberOfTypes.push(types.type.name);
  })
  return numberOfTypes;
}

const loadPokemons = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  const data = await response.json();
  const pokemons = data.results.map(pokemon => {
    id = id + 1;
    const type = getType().then (type => {return type})
    console.log(type)
    return {
      name: pokemon.name,
      url: pokemon.url,
      id: id,
      type : type
    };
  });
  console.log(pokemons)
  createPokeCard(pokemons);
};
const createPokeCard = (pokemons) => {
  pokemons.map(pokemon => {
    const pokedex = document.getElementById('pokemons')
    const pokeCard = document.createElement('div');
    const name = document.createElement('h3');
    pokeCard.className = 'pokeCard';
    name.textContent = pokemon.name;
    pokeCard.append(name)
    pokedex.append(pokeCard)
  });
};