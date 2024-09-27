const getPokemonData = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return null;
  }
};

const setupLoader = () => {
  const textMessage = 'Loading....';
  const loaderContainer = createLoadingPopup(textMessage, 'loader-container');
  togglePopup(false, loaderContainer);
  return loaderContainer;
};

const main = async () => {
  const loaderContainer = setupLoader();
  const initialData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/?limit=1&&offset=0`);
  const allpokemonsData = await getPokemonData(`https://pokeapi.co/api/v2/pokemon/?limit=${initialData.count}&&offset=0`);
  togglePopup(true, loaderContainer);
  processPokemonData(allpokemonsData.results, loaderContainer);
};

window.onload = main;