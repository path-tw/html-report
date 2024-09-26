
const getPokemonsDAta = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
  const pokemonsData = await response.json();
  console.log(pokemonsData)
}

const getTypeAndImage = async () => {
  allPokemons = await getPokemonsDAta();
  const pokemonsDetails = [];
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  const pokemon = await response.json();
  const pokemonType = pokemon.types['0'].type.name;
  const pokemonImageUrl = pokemon.sprites.front_shiny;
  console.log(allPokemons)
  
}

getTypeAndImage()