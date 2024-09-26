
const dataLimit = async function () {
  const js = await fetchAPI();
  return Object.values(js)[3].length;
};

const fetchAPI = async function () {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=250');
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
  const p1 = document.createElement('p');
  const p2 = document.createElement('p');
  const h2 = document.createElement('h2');
  h2.innerText = `${js.results[index].name}`
  p1.innerText = ` id = ${properties.id}`
  p2.innerText = ` type = ${properties.types['0'].type.name}`
  img.src = properties.sprites.front_default;
  div.append(img, h2, p1, p2);
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

window.onload = load;
