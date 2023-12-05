// Элементы профиля
const profileContainer = document.querySelector('.profile__text');
const displayName = profileContainer.querySelector('.profile__name');
const displayBio = profileContainer.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');

// Элементы формы редактирования
const popupEditElement = document.querySelector('#popup-edit');
const editForm = document.forms.userinfo;
const username = editForm.elements.username;
const bio = editForm.elements.bio;

// грид с постами
const postsContainerElement = document.querySelector('.posts-grid__list');
const postTemplate = document.querySelector('#post-template').content;

// элементы создания нового поста
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('#popup-add');

const addForm = document.forms.newpost;
const caption = addForm.elements.caption;
const link = addForm.elements.link;

// элементы модального окна с картинкой
const popupImageElement = document.querySelector('#popup-image-preview');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupImageCaption = popupImageElement.querySelector(
  '.popup__image-description'
);

// открыть модальное окно
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
// закрыть модальное окно
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// закрыть модальное окно по клику на оверлей или на кнопку закрытия
function handlePopupsMouse(evt) {
  const currentPopupElement = document.querySelector('.popup_opened');
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close-button')
  ) {
    closePopup(currentPopupElement);
  }
}

// закрыть модальное окно по нажатию на Esc
function handlePopupsEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopupElement = document.querySelector('.popup_opened');
    closePopup(currentPopupElement);
  }
}

document.addEventListener('click', handlePopupsMouse);
document.addEventListener('keydown', handlePopupsEsc);

// взаимодействие с формой редактирования профиля
function handleEditPopup() {
  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditElement);
    // заполнить поля текущими данными
    username.value = displayName.textContent;
    bio.value = displayBio.textContent;
  });
}

// отправка формы изменения персональных данных
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  displayName.textContent = username.value;
  displayBio.textContent = bio.value;
  closePopup(popupEditElement);
}

// function isEditFormValid(evt) {
//   isValid =
//     username.value.length > 2 &&
//     bio.value.length > 2 &&
//     username.value.length < 40 &&
//     bio.value.length < 200;
//   setSubmitButtonState(isValid);
// }

// function setSubmitButtonState(isEditFormValid) {
//   const editSubmitButton = editForm.querySelector('.form__submit-button');
//   if (isEditFormValid) {
//     editSubmitButton.removeAttribute('disabled');
//     editSubmitButton.classList.remove('form__submit-button_disabled');
//   } else {
//     editSubmitButton.setAttribute('disabled', true);
//     editSubmitButton.classList.add('form__submit-button_disabled');
//   }
// }

handleEditPopup();
editForm.addEventListener('submit', handleEditFormSubmit);
// editForm.addEventListener('input', isEditFormValid);

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
  const newPost = { name: caption.value, link: link.value };
  closePopup(popupAddElement);
  const postElement = createPostElement(newPost);
  postsContainerElement.prepend(postElement);
  evt.target.reset();
}

addForm.addEventListener('submit', handleAddFormSubmit);

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

// лайки и удаление постов
postsContainerElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('post__like-button')) {
    evt.target.classList.toggle('post__like-button_liked');
  }
});

postsContainerElement.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('posts-grid__delete-button')) {
    evt.target.closest('.posts-grid__list-item').remove();
  }
});
