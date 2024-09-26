function pokemon(data) {
    const pokemonContainer = document.getElementById('pokemon');
        const pokemonBlock = document.createElement('div');

        const name = document.createElement('h2');
        name.textContent = data.name;

        const id = document.createElement('p');
        id.textContent = `ID: ${data.id}`;

        const img = document.createElement('img');
        img.src = data.sprites.front_default;

        const type = document.createElement('p');
        let types = '';
        data.types.forEach(typeInfo => {
            types += typeInfo.type.name + ' ';
        });
        type.textContent = `Type: ${types.trim()}`;

      pokemonBlock.appendChild(name);
      pokemonBlock.appendChild(id);
      pokemonBlock.appendChild(img);
      pokemonBlock.appendChild(type);
        pokemonContainer.appendChild(pokemonBlock);
}
function fetching() {
    const loading = document.getElementById('loading');
    loading.style.display = 'block';
    fetch("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1302")
.then((response) => response.json())
.then((data) => data.results)
.then((arr) => {
    for (let i = 0; i < arr.length; i++) {
        fetch(arr[i].url)
            .then((response) => response.json())
            .then((pokemonData) => {
                pokemon(pokemonData);
            });
    }
    loading.style.display = 'none';
});
}
window.onload = fetching;