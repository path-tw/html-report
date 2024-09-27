'use strict';

window.onload = function () {
  const inputValue = document.getElementById('SearchBox');

  inputValue.oninput = function () {
    const searchedValue = inputValue.value;
    const result = searchPokemon(searchedValue, allPokemons);
    displaySearchedPokemons(result);
  };
};

const searchPokemon = function (query, allPokemons) {
  query = query.toLowerCase();
  return allPokemons.filter(pokemon =>
    pokemon.Name.toLowerCase().includes(query) ||
    pokemon.Types.toLowerCase().includes(query) ||
    pokemon.id.toString().includes(query)
  );
}

const displaySearchedPokemons = function (result) {
  const container = document.getElementById("displaySearchedElements");
  container.innerHTML = '';
  result.forEach(pokemon => {
    appendSearchedPokemon(pokemon);
  });
};

const appendSearchedPokemon = function (data) {
  const container = document.getElementById("displaySearchedElements");
  const pokemon = document.createElement("div");
  pokemon.className = "pokemon";

  appendPokeImage(data, pokemon);
  appendPokeId(data, pokemon);
  appendPokeName(data, pokemon);
  appendPokeType(data, pokemon);

  container.append(pokemon);
};
