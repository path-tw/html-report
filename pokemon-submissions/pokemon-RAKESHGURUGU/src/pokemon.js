const renderPokemon = async (loader) => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-form/?limit=1302');
  const result = await response.json();
  console.log(result.results);
  for (let index = 0; index < result.results.length; index++) {
    const link = await fetch(result.results[index].url);
    const info = await link.json();
    renderPokemonNameAndId(info.name, info.id, info.sprites.front_shiny, info.types[0].type.name);
  }
  loader.remove();
}

const renderPokemonNameAndId = (name, id, image, type) => {
  const mainContainer = document.getElementById('pokemons');
  const container = document.createElement('div');
  const printName = document.createElement('p');
  const printId = document.createElement('p');
  printId.className = 'pokemonId';
  container.className = 'pokemonInfo';
  printName.className = 'pokemonName';
  printId.innerText = `Id : ${id}`;
  printName.innerText = `Name : ${name}`;
  mainContainer.appendChild(container);
  container.appendChild(printName);
  container.appendChild(printId);
  renderPokemonImgAndType(container, image, type);
}

const renderPokemonImgAndType = (container, image, type) => {
  const printImg = document.createElement('img');
  printImg.className = 'image';
  printImg.src = image;
  container.appendChild(printImg);
  const printType = document.createElement('p');
  printType.className = 'pokemonType';
  printType.innerText = `Type : ${type}`;
  container.appendChild(printType);
}

const showLoader = () => {
  const loader = document.createElement('p');
  loader.id = 'loader';
  loader.innerText = 'Page is still loading...';
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(loader);
  renderPokemon(loader);
}

const callSearch = () => {
  const loader = document.getElementById('loader');
  const search = document.getElementById('search');
  if (loader) {
    loader.innerText = `The search functionality will not active until the page loads`;
    search.value = '';
  } else {
    searchFunctionality(search.value);
  }
}

const searchFunctionality = (value) => {
  const container = document.getElementsByClassName('pokemonInfo');
  const pokemonName = document.getElementsByClassName('pokemonName');
  const pokemonId = document.getElementsByClassName('pokemonId');
  const pokemonType = document.getElementsByClassName('pokemonType');
  const searchValue = value.toLowerCase();
  for (let index = 0; index < container.length; index++) {
    const name = pokemonName[index].innerText.toLowerCase();
    const id = pokemonId[index].innerText.toLowerCase();
    const type = pokemonType[index].innerText.toLowerCase();

    if (name.match(searchValue) || id.match(searchValue) || type.match(searchValue)) {
      container[index].style.display = 'block';
    } else {
      container[index].style.display = 'none';
    }
  }
}

window.onload = () => {
  showLoader();
  document.getElementById('search').addEventListener('input', callSearch);
}
