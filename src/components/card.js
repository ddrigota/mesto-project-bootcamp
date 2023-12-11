import {
  postTemplate,
  postsContainerElement,
  caption,
  link,
  popupAddElement,
  popupImage,
  popupImageElement,
  popupImageCaption,
  addButton,
  deleteConfirmationPopup,
} from './constants.js';

import { openPopup, closePopup, renderLoading } from './utils.js';
import { addPost, getPosts, deletePost } from './api.js';

// открытие и закрытие окна "добавить новый пост"
function handleAddPopup() {
  addButton.addEventListener('click', () => {
    openPopup(popupAddElement);
  });
}

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
  postElement.addEventListener('click', handlePostEvents);
  postElement.id = card._id;
  return postElement;
}

// отрисовка первоначальных постов
function renderPosts() {
  getPosts().then((data) => {
    data.forEach((card) => {
      const postElement = createPostElement(card);
      postsContainerElement.append(postElement);
      if (card.owner._id === '86f8732160a3d589d063f4ea') {
        postElement
          .querySelector('.post__delete-button')
          .classList.add('post__delete-button_visible');
      }
    });
  });
}

// новый пост
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupAddElement);
  addPost(caption.value, link.value)
    .then((newPost) => {
      const postElement = createPostElement(newPost);
      postsContainerElement.prepend(postElement);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAddElement);
      closePopup(popupAddElement);
      evt.target.reset();
    });
}

// удаление поста
function handlePostDelete(postId) {
  openPopup(deleteConfirmationPopup);
  deleteConfirmationPopup.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deletePost(postId)
      .then(() => {
        document.getElementById(postId).remove();
        closePopup(deleteConfirmationPopup);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

// превью, лайки и удаление поста
function handlePostEvents(evt) {
  if (evt.target.classList.contains('post__like-button')) {
    // лайки
    evt.target.classList.toggle('post__like-button_liked');
  } else if (evt.target.classList.contains('post__delete-button')) {
    // удаление поста
    handlePostDelete(evt.target.closest('.posts-grid__list-item').id);
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

export { handleAddPopup, renderPosts, handleAddFormSubmit };
