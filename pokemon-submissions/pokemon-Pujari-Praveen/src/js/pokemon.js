const getPokemonData = async (endpoint) => {
  const response = await fetch(endpoint);
  const responseJson = await response.json();
  return responseJson;
};

const main = async () => {
  const responseJson = await getPokemonData('https://pokeapi.co/api/v2/pokemon/');
  processPokemonData(responseJson);
};

window.onload = main;