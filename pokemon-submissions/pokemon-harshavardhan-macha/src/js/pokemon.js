 pokemonContainer = document.getElementById('container');

      fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        .then((response) => response.json())
        .then((data) => {
              data.results.map((cartoon) => {
             fetch(cartoon.url)
              .then((response) => response.json())
              .then((pokemonData) => {
                const pokemonElement = document.createElement("div");

                const imageElement = document.createElement("img");
                imageElement.src = pokemonData.sprites.front_default;
                imageElement.alt = pokemonData.name;
                pokemonElement.appendChild(imageElement);

                const nameElement = document.createElement("h2");
                nameElement.textContent ='NAME :'+ pokemonData.name;
                pokemonElement.appendChild(nameElement);

                const idElement = document.createElement("p");
                idElement.textContent = "ID :" + pokemonData.id;
                pokemonElement.appendChild(idElement);

                const typeElement = document.createElement("p");
                typeElement.textContent = " TYPE :" +pokemonData.types.map((pokemonType) => pokemonType.type.name);
                pokemonElement.appendChild(typeElement);

                pokemonContainer.appendChild(pokemonElement);
              });
          });
        });