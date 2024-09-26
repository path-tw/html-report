const getPokemonData = async (apiUrl) => {
  const response = await fetch(apiUrl);
  const responseJson = await response.json();
  return responseJson;
};

const main = async () => {
  try {
    let responseJson = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/?limit=1&&offset=0`);
    responseJson = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/?limit=359&&offset=0`);
    processPokemonData(responseJson);
  } catch (error) {
    console.log(`ERROR IS ${error}`);
  }
};

window.onload = main;