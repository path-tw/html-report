let button = document.querySelector('button');
let main = document.querySelector('main');
let pokemonsContainer = document.querySelector('#pokemonsContainer');
let increment = 0;
let namesContainer = [];

button.addEventListener('click', () => {
increment = increment + 10;
fetch(`https://pokeapi.co/api/v2/pokemon-form/?offset=0&limit=${increment}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    return data;
  })
  .then((data) => {
    return data.results;
  })
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
    fetch(data[i].url)
      .then((data) => {
        return data.json()
      })
      .then((data) =>{
        let typesContainer = [];
        let pokemonType;
        //  console.log(data.types)
        for (let i = 0; i < data.types.length; i++ ) {
          typesContainer.push(data.types[i].type.name);
        }
        for (let i = 0; i < typesContainer.length; i++) {
         pokemonType = document.createElement('p');
          pokemonType.innerText = typesContainer;
          // console.log(typesContainer)
        }
        let pokemonNamesContainer = [];
        pokemonNamesContainer.push(data.name);
        namesContainer.push(pokemonNamesContainer)
        // for (let i = 0; i < pokemonNamesContainer.length; i++) {
        //  // console.log(pokemonNamesContainer[i]);
        // }
        let divContainer = document.createElement('div');
        divContainer.setAttribute('class', 'pokemonDiv')
        let imageContainer = document.createElement('img');
        imageContainer.setAttribute('class', 'pokemonImage');
        let pokemonName = document.createElement('p');
        pokemonName.setAttribute('class', 'pokemonName');
        pokemonName.innerText = pokemonNamesContainer;
        imageContainer.src = data.sprites.front_default;
        main.append(pokemonsContainer);
        pokemonsContainer.append(divContainer);
        divContainer.append(imageContainer);           
        divContainer.append(pokemonName);
        divContainer.append(pokemonType);
      })
    }
  })
});
