// Элементы профиля
const profileContainer = document.querySelector('.profile__text');
const displayName = profileContainer.querySelector('.profile__name');
const displayBio = profileContainer.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');

// Элементы формы редактирования
const popupEditElement = document.querySelector('#popup-edit');
const editFormElement = popupEditElement.querySelector('.form');
const usernameInput = popupEditElement.querySelector('#username');
const bioInput = popupEditElement.querySelector('#bio');

// грид с постами
const postsContainerElement = document.querySelector('.posts-grid__list');
const postTemplate = document.querySelector('#post-template').content;

// элементы создания нового поста
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('#popup-add');

const addFormElement = popupAddElement.querySelector('.form');
const locationInput = popupAddElement.querySelector('#location');
const linkInput = popupAddElement.querySelector('#link');

// элементы модального окна с картинкой
const popupImageElement = document.querySelector('#popup-image-preview');

const popupImage = popupImageElement.querySelector('.popup__image');
const popupImageCaption = popupImageElement.querySelector(
  '.popup__image-description'
);
// кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close-button');

// открыть модальное окно
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
// закрыть модальное окно
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// Обработка закрытия по крестику
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// взаимодействие с формой редактирования профиля
function handleEditPopup() {
  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditElement);
    // заполнить поля текущими данными
    usernameInput.value = displayName.textContent;
    bioInput.value = displayBio.textContent;
  });
}

// отправка формы изменения персональных данных
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  const username = usernameInput.value;
  const bio = bioInput.value;
  displayName.textContent = username;
  displayBio.textContent = bio;

  closePopup(popupEditElement);
}

handleEditPopup();
editFormElement.addEventListener('submit', handleEditFormSubmit);

// создание новго поста
function createPostElement(card) {
  const postElement = postTemplate
    .querySelector('.posts-grid__list-item')
    .cloneNode(true);

  const postImage = postElement.querySelector('.post__image');
  const postText = postElement.querySelector('.post__text');

  postImage.src = card.link;
  postImage.alt = card.name;
  postText.textContent = card.name;

  handleLike(postElement);
  handleDelete(postElement);

  return postElement;
}

// отрисовка первоначальных постов
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

  initialCards.forEach((card) => {
    const postElement = createPostElement(card);
    postsContainerElement.append(postElement);
  });
}

renderInitialPosts();

// открытие и закрытие окна "добавить новый пост"
function handleAddPopup() {
  addButton.addEventListener('click', () => {
    openPopup(popupAddElement);
  });
}

handleAddPopup();

// новый пост
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPost = { name: locationInput.value, link: linkInput.value };
  closePopup(popupAddElement);
  const postElement = createPostElement(newPost);
  postsContainerElement.prepend(postElement);
  evt.target.reset();
}

addFormElement.addEventListener('submit', handleAddFormSubmit);

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

//открыть модальное окно с картинкой при нажатии на изображение в посте
function handleImagePopup() {
  postsContainerElement.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('post__image')) {
      const image = evt.target;
      const imageCaption = image
        .closest('.posts-grid__list-item')
        .querySelector('.post__text').textContent;
      popupImage.src = image.src;
      popupImage.alt = imageCaption;
      popupImageCaption.textContent = imageCaption;
      openPopup(popupImageElement);
    }
  });
}

handleImagePopup();
