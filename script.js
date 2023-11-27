// Элементы профиля
const profileContainer = document.querySelector('.profile__text');
const displayName = profileContainer.querySelector('.profile__name');
const displayBio = profileContainer.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');

// Элементы формы
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.form');
const nameInput = popupElement.querySelector('#name');
const bioInput = popupElement.querySelector('#bio');

// открыть и закрыть модальное окно
function togglePopup() {
  popupElement.classList.toggle('popup_opened');
}

function handleEditPopup() {
  profileEditButton.addEventListener('click', togglePopup);
  popupCloseButton.addEventListener('click', togglePopup);

  // заполнить поля текущими данными
  nameInput.value = displayName.textContent;
  bioInput.value = displayBio.textContent;
}

// отправка формы изменения персональных данных
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const bio = bioInput.value;
  displayName.textContent = name;
  displayBio.textContent = bio;
  togglePopup();
}

handleEditPopup();
formElement.addEventListener('submit', handleFormSubmit);

const postsContainerElement = document.querySelector('.posts-grid__list');
const postTemplate = document.querySelector('#post-template').content;

// создание новго поста
function createPostElement(card) {
  const postElement = postTemplate
    .querySelector('.posts-grid__list-item')
    .cloneNode(true);

  const postImage = postElement.querySelector('.post__image');
  const postText = postElement.querySelector('.post__text');

  postImage.src = card.link;
  postText.textContent = card.name;

  handleLike(postElement);
  handleDelete(postElement);

  return postElement;
}

function renderInitialPosts() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
  ];

  for (let i = 0; i < initialCards.length; i++) {
    const postElement = createPostElement(initialCards[i]);
    postsContainerElement.append(postElement);
  }
}

// обработка лайков, которая потом загружается в функции отрисовки постов
function handleLike(postElement) {
  postElement
    .querySelector('.post__like-button')
    .addEventListener('click', (evt) => {
      evt.target.classList.toggle('post__like-button_liked');
    });
}

// обработка удаления постов, которая потом загружается в функции отрисовки постов
function handleDelete(postElement) {
  postElement
    .querySelector('.posts-grid__delete-button')
    .addEventListener('click', (evt) => {
      evt.target.closest('.posts-grid__list-item').remove();
    });
}

renderInitialPosts();
