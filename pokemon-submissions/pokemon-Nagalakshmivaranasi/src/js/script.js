const fetchPokemonData = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon';
  const options = {
    method: 'GET'
  }
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    let details = {}, pokemonData = {}, array = [];
    for (let element of data.results) {
      details = await fetch(element.url);
      pokemonData = await details.json();
      const pokemonInfo = {
        id: pokemonData.id, 
        name: pokemonData.name, 
        type: pokemonData.types[0].type.name,
        image: pokemonData.sprites.front_default
      };
      array.push(pokemonInfo);
    }
    console.log(array);
    return array;
  }
  catch (error) {
    console.error('error at fetching data', error);
  }
};

const totalData = fetchPokemonData();
console.log(totalData);


const addDetial = (label, value) => {
  const pTag = document.createElement('p');
  const spanTag = document.createElement('span');
  spanTag.classList.add('bold-text');
  spanTag.innerText = label;
  pTag.append(spanTag, value);
  return pTag;
};

const addImage = (addImage) => {
  const image = document.createElement('img');
  image.classList.add('image');
  // image.setAttribute('src', 'addImage');
  image.src = addImage;
  return image;
};

const displayPokemonDetails = (totalData) => {
  const container = document.createElement('div');
  container.classList.add('pokemon-details');

  const pokemonImage = addImage(totalData['image']);
  const pokemonName = addDetial('Name:', totalData['name']);
  const pokemonType = addDetial('Type:', totalData['type']);
  const pokemonId = addDetial('Id:', totalData['id']);

  container.append(pokemonImage, pokemonName, pokemonType, pokemonId)
  const pokemonContainer = document.getElementById('pokemon-container');
  pokemonContainer.appendChild(container);  
};

window.onload = displayPokemonDetails;
