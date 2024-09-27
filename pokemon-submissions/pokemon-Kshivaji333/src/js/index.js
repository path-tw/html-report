
const appendCards = () => {
  const container = document.getElementById('pokemonsContainer');
  for (const pokemon of allPokemonsData) {
    const card = createCard(pokemon);
    container.appendChild(card);
  }
};
window.onload = () => {
  // showLoader()
  createPokemonsData().then(() => {
    appendCards();
  })
}