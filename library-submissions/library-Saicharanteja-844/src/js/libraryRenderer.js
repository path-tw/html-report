'use strict';

const dropDownOptions = [
  {
    value: 'none',
    text: 'Select',
  },
  {
    value: 'name',
    text: 'Name',
  },
  {
    value: 'genre',
    text: 'Genre',
  },
  {
    value: 'author',
    text: 'Author',
  },
  {
    value: 'publishedYear',
    text: 'Published Year',
  },
  {
    value: 'isAvailable',
    text: 'Availability',
  },
];
const genreToColor = {};

const getDarkColor = () => {
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  const colors = Object.values(genreToColor);
  const finalColor = colors.includes(color) ? getDarkColor() : color;
  return finalColor + '80';
};

const generateOrGetGenreColor = genre => {
  if (!genre) return;
  const genreLowerCase = genre.toLowerCase();
  const color = genreToColor[genreLowerCase] || getDarkColor();
  genreToColor[genreLowerCase] = color;
  return color;
};

const createGenre = genre => {
  const tag = createPTag(genre, 'genre');
  tag.style.backgroundColor = generateOrGetGenreColor(genre);
  return tag;
};

const createButton = (text, className, callback) => {
  const button = document.createElement('button');
  button.classList.add(className);
  button.innerText = text;
  callback && button.addEventListener('click', callback);
  return button;
};

const createAvailabilityBar = isAvailable => {
  const dot = document.createElement('div');
  dot.classList.add((isAvailable ? 'available' : 'unavailable') + '-bar');
  return dot;
};

const createPTag = (text, className) => {
  const pTag = document.createElement('p');
  className && pTag.classList.add(className);
  pTag.innerText = text;
  return pTag;
};

const createDetailsElement = (key, value) => {
  const container = document.createElement('p');

  const keyContainer = document.createElement('span');
  keyContainer.innerText = key;
  container.appendChild(keyContainer);

  const valueContainer = document.createElement('span');
  valueContainer.classList.add('info');
  valueContainer.innerText = value;
  container.appendChild(valueContainer);

  return container;
};

const createInputWithLabel = ({ id, text, type }) => {
  const container = document.createElement('div');
  container.classList.add('form-field');

  const nameLabel = document.createElement('label');
  nameLabel.classList.add('form-label');
  nameLabel.for = id;
  nameLabel.innerText = text;

  const nameInput = document.createElement('input');
  nameInput.type = type;
  nameInput.id = id;
  nameInput.name = id;
  nameInput.placeholder = `Enter ${text}`;
  nameInput.classList.add('form-input');

  container.appendChild(nameLabel);
  container.appendChild(nameInput);
  return container;
};

const closePopup = popup => {
  const header = document.getElementById('header');
  const main = document.getElementById('main');
  const buttons = document.getElementById('group-by');
  buttons.classList.remove('buttonsOfHeader');
  header.classList.remove('disabled');
  main.classList.remove('disabled');
  popup.remove();
};

const showPopup = popup => {
  const body = document.getElementsByTagName('body')[0];
  body.appendChild(popup);

  const header = document.getElementById('header');
  header.classList.add('disabled');
  const main = document.getElementById('main');
  main.classList.add('disabled');
};

const attachPopupActions = (
  popup,
  primaryActionText,
  primaryActionCallback
) => {
  const popupActions = document.createElement('div');
  popupActions.classList.add('popup-actions');

  const submitButton = document.createElement('button');
  submitButton.classList.add('action-button');
  submitButton.innerText = primaryActionText.toUpperCase();
  popupActions.appendChild(submitButton);

  const closeButton = document.createElement('button');
  closeButton.classList.add('close-button');
  closeButton.innerText = 'CLOSE';

  popupActions.appendChild(closeButton);
  popup.appendChild(popupActions);

  closeButton.addEventListener('click', () => closePopup(popup));

  submitButton.addEventListener('click', () => {
    primaryActionCallback();
    closePopup(popup);
  });
};

const createPopup = (
  title,
  children,
  primaryActionText,
  primaryActionCallback
) => {
  const popup = document.createElement('div');
  popup.classList.add('popup-container');

  const popupTitle = createPTag(title, 'popup-header');
  popup.appendChild(popupTitle);

  children.forEach(child => popup.appendChild(child));

  attachPopupActions(popup, primaryActionText, primaryActionCallback);
  return popup;
};

const handleLendOrReturnBook = bookId => {
  lendOrReturnBook(bookId);
  groupAndRenderBooks();
};

const handleAddBookSubmission = () => {
  const nameInputElement = document.getElementById('new-book-name');
  const publishedYearInputElement = document.getElementById(
    'new-book-published-year'
  );
  const genreInputElement = document.getElementById('new-book-genre');
  const authorInputElement = document.getElementById('new-book-author');
  const name = nameInputElement.value;
  const publishedYear = publishedYearInputElement.value;
  const genre = genreInputElement.value;
  const author = authorInputElement.value;

  if (
    name == '' ||
    publishedYear == '' ||
    genre == '' ||
    author == '' ||
    name == null ||
    publishedYear == null ||
    genre == null ||
    author == null ||
    name == undefined ||
    publishedYear == undefined ||
    genre == undefined ||
    author == undefined
  ) {
    alert(`Invalid Data !!!
        name: ${name}
        published year: ${publishedYear}
        genre: ${genre}
        author: ${author}
      `);
    return;
  }
 
  const newBook =  {
    id: true,
    name: name.trim(),
    publishedYear: publishedYear.trim(),
    genre: genre.trim(),
    author: author.trim(),
    isAvailable: null
  };
  addBook(newBook);
  alert(`Book "${name}" added successfully`);
  groupAndRenderBooks(true);
};

const createDropdownAction = (scrollToTop) => {
  const select = document.getElementById('group-by');
  select.addEventListener('change', () => groupAndRenderBooks(scrollToTop));
};

const addActionToAddBookButton = () => {
  const addBookBtn = document.querySelector('.add-book-button');
  addBookBtn.addEventListener('click', () => showAddBookPopup());
};

const addHomePageActions = () => {
  const container = document.getElementsByClassName('home-actions')[0];
  createDropdownAction(true);
  addActionToAddBookButton(container);
};

const showAddBookPopup = () => {
  const children = [
    createInputWithLabel({
      text: 'Name',
      id: 'new-book-name',
      type: 'text',
    }),
    createInputWithLabel({
      text: 'Published Year',
      id: 'new-book-published-year',
      type: 'number',
    }),
    createInputWithLabel({
      text: 'Genre',
      id: 'new-book-genre',
      type: 'text',
    }),
    createInputWithLabel({
      text: 'Author',
      id: 'new-book-author',
      type: 'text',
    }),
  ];

  const popup = createPopup('Add new book', children, 'submit', () =>
    handleAddBookSubmission()
  );
  showPopup(popup);
};

const renderBookActionsPopup = bookId => {
  const book = getBook(bookId);
  if (book == null) return;

  const children = [
    createDetailsElement('By', book.author),
    createDetailsElement('In', book.publishedYear),
    createGenre(book.genre),
    createPTag(
      book.isAvailable ? 'Available' : 'Unavailable',
      book.isAvailable ? 'available-message' : 'unavailable-message'
    ),
  ];

  const popup = createPopup(
    book.name,
    children,
    book.isAvailable ? 'lend' : 'take back',
    () => handleLendOrReturnBook(book.id)
  );
  showPopup(popup);
};

const renderBook = (book, parent) => {
  const bookContainer = document.createElement('div');
  bookContainer.classList.add('book');
  bookContainer.id = book.id;
  bookContainer.addEventListener('click', () =>
    renderBookActionsPopup(book.id)
  );

  const statusDot = createAvailabilityBar(book.isAvailable);
  bookContainer.appendChild(statusDot);

  const bookName = createPTag(book.name, 'book-name');
  bookContainer.appendChild(bookName);

  const bookAuthor = createDetailsElement('By', book.author);
  bookContainer.appendChild(bookAuthor);

  const bookPublishedYear = createDetailsElement('In', book.publishedYear);
  bookContainer.appendChild(bookPublishedYear);

  const bookGenre = createGenre(book.genre);
  bookContainer.appendChild(bookGenre);

  parent.appendChild(bookContainer);
};

const renderGroupedBooks = (groupSelection) => {
  const groupedBooks = groupBooks(groupSelection);
  const grouped = Object.entries(groupedBooks);
  const booksContainer = document.getElementById('books');
  booksContainer.innerHTML = '';

  for (const [groupedOption, books] of grouped) {
    const fieldSet = document.createElement('fieldset');
    fieldSet.classList.add('books-group');

    const legend = document.createElement('legend');
    legend.innerText = groupedOption;
    fieldSet.appendChild(legend);

    books.forEach(book => renderBook(book, fieldSet));
    booksContainer.appendChild(fieldSet);
  }
};

const renderLegends = () => {
  const container = document.getElementById('legends');
  container.innerHTML = '';

  let legendContainer = document.createElement('div');
  legendContainer.classList.add('legend-container');

  let legend = document.createElement('div');
  legend.classList.add('available-bar');

  let message = document.createElement('span');
  message.innerText = 'Available';

  legendContainer.appendChild(legend);
  legendContainer.appendChild(message);
  container.appendChild(legendContainer);

  legendContainer = document.createElement('div');
  legendContainer.classList.add('legend-container');

  legend = document.createElement('div');
  legend.classList.add('unavailable-bar');

  message = document.createElement('span');
  message.innerText = 'Unavailable';

  legendContainer.appendChild(legend);
  legendContainer.appendChild(message);
  container.appendChild(legendContainer);
};

const groupAndRenderBooks = (scrollToTop = false) => {
  const groupDropdown = document.getElementById('group-by');
  const groupSelection = groupDropdown.value;

  renderGroupedBooks(groupSelection);
  renderLegends();
  scrollToTop && window.scrollTo({ top: 0, behavior: 'smooth' });
};

const render = () => {
  addHomePageActions();
  groupAndRenderBooks();
};
