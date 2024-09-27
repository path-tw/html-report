
const searchBar = () => {
  const inputTag = document.getElementById('input');
  inputTag.id = 'searchBar';
  inputTag.placeholder = 'name,type,id..'
}

const showLoader = () => {
  const container = document.querySelector('main')
  const loadIcon = document.createElement('div')
  loadIcon.className = 'loading-icon';
  container.appendChild(loadIcon);
}

const appendCards = () => {
  const container = document.getElementById('pokemonsContainer');
  for (const pokemon of allPokemonsData) {
    const card = createCard(pokemon);
    container.appendChild(card);
  }
};

window.onload = () => {
  showLoader()
  // const loader = document.querySelector('loading-icon')
  createPokemonsData().then(() => {
    appendCards();
  })
}

// window.onscroll = () => {
//   // console.log('reached end')
// if(window.scrollY = window.innerHeight >= document.documentElement.scrollHeight){
//   console.log('reached end');
//   appendCards()
// }
// }