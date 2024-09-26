let button = document.querySelector('button');
let main = document.querySelector('main');
let pokemonsContainer = document.querySelector('#pokemonsContainer');
let increment = 0;
let namesContainer = [];

button.addEventListener('click', () => {
increment = increment + 300;
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
        let pokemonID = document.createElement('p');
        let typesContainer = [];
        let pokemonType;
         console.log(data)
        for (let i = 0; i < data.types.length; i++ ) {
          typesContainer.push(data.types[i].type.name);
        }
        for (let i = 0; i < typesContainer.length; i++) {
         pokemonType = document.createElement('p');
          pokemonType.innerText = `Type: ${typesContainer}`;
          if (typesContainer[i] === 'water') {
            pokemonType.setAttribute('id', 'water');
          }
          if (typesContainer[i] === 'fire' || typesContainer[i] === 'flying') {
            pokemonType.setAttribute('id', 'fire');
          }
          if (typesContainer[i] === 'grass' || typesContainer[i] === 'poison') {
            pokemonType.setAttribute('id', 'grass');
          }
          if (typesContainer[i] === 'bug') {
            pokemonType.setAttribute('id', 'bug');
          }
          if (typesContainer[i] === 'normal') {
            pokemonType.setAttribute('id', 'normal');
          }
          if (typesContainer[i] === 'electric' || typesContainer[i] === 'steel') {
            pokemonType.setAttribute('id', 'electric');
          }
          if (typesContainer[i] === 'ground' || typesContainer[i] === 'rock') {
            pokemonType.setAttribute('id', 'ground');
          }
          if (typesContainer[i] === 'ghost') {
            pokemonType.setAttribute('id', 'ghost');
          }
          if (typesContainer[i] === 'dark') {
            pokemonType.setAttribute('id', 'dark');
          }
          if (typesContainer[i] === 'dragon') {
            pokemonType.setAttribute('id', 'dragon');
          }
          if (typesContainer[i] === 'fairy') {
            pokemonType.setAttribute('id', 'fairy');
          }
          if (typesContainer[i] === 'fighting') {
            pokemonType.setAttribute('id', 'fighting');
          }
          if (typesContainer[i] === 'ice') {
            pokemonType.setAttribute('id', 'ice');
          }
          if (typesContainer[i] === 'psychic') {
            pokemonType.setAttribute('id', 'psychic');
          }
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
        pokemonName.innerText = `Name: ${pokemonNamesContainer}`;
        pokemonID.innerText = `ID: ${data.id}`;
        pokemonID.setAttribute('class', 'pokemonID');
        imageContainer.src = data.sprites.front_default;
        main.append(pokemonsContainer);
        pokemonsContainer.append(divContainer);
        divContainer.append(pokemonID);           
        divContainer.append(imageContainer);           
        divContainer.append(pokemonName);
        divContainer.append(pokemonType);

        // console.log(pokemonType)
       

      })
    }
  })
});
