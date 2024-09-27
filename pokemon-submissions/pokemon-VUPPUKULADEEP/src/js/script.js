
const dataLimit = async function () {
  const js = await fetchAPI();
  return Object.values(js)[3].length;
};

const fetchAPI = async function () {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=50');
  const value = await response.json();
  return value;
};

const data = async function (container, index) {
  const js = await fetchAPI();
  const result = await fetch(js.results[index].url);
  properties = await result.json();
  const div = createContainer(js, properties, index);
  container.append(div);
};

const createContainer = function (js, properties, index) {
  const div = document.createElement('div');
  div.className = 'content';
  const img = document.createElement('img');
  img.className = 'img';
  const id = document.createElement('p');
  id.className = 'id';
  const type = document.createElement('p');
  type.className = 'type';
  const name = document.createElement('h2');
  name.className = 'name';
  name.innerText = `${js.results[index].name}`
  id.innerText = ` id = ${properties.id}`
  type.innerText = ` type = ${properties.types['0'].type.name}`
  img.src = properties.sprites.front_default;
  div.append(img, name, id, type);
  return div;
};

const main = async (loader) => {
  const container = document.createElement('div');
  container.className = 'container';
  const limit = await dataLimit()
  let index = 0;
  while (index < limit) {
    await data(container, index);
    index++;
  }
  return new Promise((resolve, reject) => {
    document.body.removeChild(loader);
    document.body.append(container);
    resolve();
  })
};

const load = async function () {
  const loader = document.createElement('div');
  loader.className = 'loader';
  document.body.appendChild(loader);
  await main(loader);
};

window.onload = async () => {
  await load();
  searchaddevent();
};
