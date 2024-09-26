"use strict";

const fetchPokeDetails = async function () {
  let url = "https://pokeapi.co/api/v2/pokemon?limit=100";
  while (url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      for (let pokemon of data.results) {
        await fetchPokeInfo(pokemon.url);
      }
      url = data.next;
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      break;
    }
  }
};

const fetchPokeInfo = async function (url) {
  try {
      const response = await fetch(url);
      const data = await response.json();
      displayPokemon(data);
  } catch (error) {
      console.error("Error fetching Pokémon info:", error);
  }
};

const displayPokemon = function(data) {
  const container = document.getElementById('container');
  const pokemon = document.createElement('div');
  pokemon.className = 'pokemon';
  appendPokeImage(data, pokemon);
  appendPokeId(data, pokemon);
  appendPokeName(data, pokemon);
  appendPokeType(data, pokemon);
  container.append(pokemon);
};

const appendPokeName = function (data, pokemon) {
  const name = document.createElement('div');
  name.innerText = "Name :" + data.name;
  pokemon.append(name);
};

const appendPokeId = function (data, pokemon) {
  const pokeId = document.createElement('div');
  pokeId.innerText = `ID: ${data.id}`;
  pokemon.append(pokeId);
};

const appendPokeImage = function (data, pokemon) {
  const pokeImg = document.createElement('img');
  pokeImg.src = data.sprites.front_default;
  pokemon.append(pokeImg);
};

const appendPokeType = function (data, pokemon) {
    const types = document.createElement('div');
    types.innerText = "Types: " + data.types.map(type => type.type.name);
    pokemon.append(types);
  };

fetchPokeDetails();
