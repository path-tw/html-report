window.onload = function () {
    fetchPokemon(); 
}
const arrayOfPokemons = [];
const fetchPokemon = async () => {
    const totalPokemons = await fetch("https://pokeapi.co/api/v2/pokemon-form/");
    const parsePokemons = await totalPokemons.json();
     const resultsArray = parsePokemons.results;
    for (const element of resultsArray) {
      const pokemonName = element.name;
      const pokemon =await fetchEachPokemonDetails(pokemonName, element.url);
      arrayOfPokemons.push(pokemon)
    }
   createAndAppendElements(arrayOfPokemons);
}
const fetchEachPokemonDetails = async (pokemonName, url) => {
  const object ={ name: undefined,
                  id: undefined,
                  imageUrl: undefined,
                  type: undefined 
                };
  const eachPokemon = await fetch(url);
  const parseEachPokemon = await eachPokemon.json();
  const pokemonId = parseEachPokemon['id'];
  const pokemonImage = parseEachPokemon['sprites']['front_default'];
  let pokemonType1 = parseEachPokemon['types'][0]['type']['name'];
  const pokemonType2 = (parseEachPokemon['types'][1])?parseEachPokemon['types'][1]['type']['name']:undefined;
  if (pokemonType2) {
    pokemonType1 = pokemonType1+' '+pokemonType2;
  }
  object.name = pokemonName;
  object.id = pokemonId;
  object.imageUrl = pokemonImage;
  object.type = pokemonType1;
  return object;
}
const createAndAppendElements = function (pokemons) {
  const totalPokemons = document.getElementById('pokemons');
  for (let index = 0; index < pokemons.length; index++) {
    const section = document.createElement('section');
    section.className = 'pokemon';
    totalPokemons.appendChild(section);
    displayDetails(section, pokemons[index]['name'], pokemons[index]['id'], pokemons[index]['imageUrl'], pokemons[index]['type']);
  }
}
const displayDetails = function (section,pokemonName, pokemonId, pokemonImage, pokemonType) {
  const image = document.createElement('img');
  const name = document.createElement('p');
  const id = document.createElement('p');
  const type = document.createElement('p');
  section.appendChild(image);
  section.appendChild(name);
  section.appendChild(id);
  section.appendChild(type);
  image.src = pokemonImage;
  name.innerText = 'name :'+pokemonName;
  id.innerText = 'id :'+pokemonId;
  type.innerText = 'type :'+pokemonType;
}