import {
  postTemplate,
  postsContainerElement,
  caption,
  link,
  popupAddElement,
  popupImage,
  popupImageElement,
  popupImageCaption,
} from './constants.js';

import { openPopup, closePopup } from './utils.js';

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

// новый пост
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newPost = { name: caption.value, link: link.value };
  closePopup(popupAddElement);
  const postElement = createPostElement(newPost);
  postsContainerElement.prepend(postElement);
  evt.target.reset();
}

// превью, лайки и удаление поста

function handlePostEvents(evt) {
  if (evt.target.classList.contains('post__like-button')) {
    // лайки
    evt.target.classList.toggle('post__like-button_liked');
  } else if (evt.target.classList.contains('posts-grid__delete-button')) {
    // удаление поста
    evt.target.closest('.posts-grid__list-item').remove();
  } else if (evt.target.classList.contains('post__image')) {
    // превью картинки
    const image = evt.target;
    const imageCaption = image
      .closest('.posts-grid__list-item')
      .querySelector('.post__text').textContent;
    popupImage.src = image.src;
    popupImage.alt = imageCaption;
    popupImageCaption.textContent = imageCaption;
    openPopup(popupImageElement);
  }
}

export { renderInitialPosts, handleAddFormSubmit, handlePostEvents };
