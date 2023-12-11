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
import {
  addPost,
  getPosts,
  deletePost,
  likePost,
  dislikePost,
  myId,
} from './api.js';

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
  const postLikeCounter = postElement.querySelector('.post__like-counter');

  postImage.src = card.link;
  postImage.alt = card.name;
  postText.textContent = card.name;
  postLikeCounter.textContent = card.likes.length;
  postElement.id = card._id; // присваиваем элементу списка id поста
  if (card.likes.some((like) => like._id === myId)) {
    postElement
      .querySelector('.post__like-button')
      .classList.add('post__like-button_liked');
  }
  postElement.addEventListener('click', handlePostEvents);
  return postElement;
}

// отрисовка первоначальных постов
function renderPosts() {
  getPosts().then((data) => {
    data.forEach((card) => {
      const postElement = createPostElement(card);
      postsContainerElement.append(postElement);
      if (card.owner._id === myId) {
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

// лайки и дизлайки

function handlePostLike(evt, postId) {
  evt.target.classList.add('post__like-button_liked');
  likePost(postId)
    .then((data) => {
      const likeCounter = document
        .getElementById(postId)
        .querySelector('.post__like-counter');
      likeCounter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handlePostDislike(evt, postId) {
  evt.target.classList.remove('post__like-button_liked');
  dislikePost(postId)
    .then((data) => {
      const likeCounter = document
        .getElementById(postId)
        .querySelector('.post__like-counter');
      likeCounter.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

// превью, лайки и удаление поста
function handlePostEvents(evt) {
  const currentPostId = evt.target.closest('.posts-grid__list-item').id;
  if (
    evt.target.classList.contains('post__like-button') &&
    !evt.target.classList.contains('post__like-button_liked')
  ) {
    // лайки
    handlePostLike(evt, currentPostId);
  } else if (
    evt.target.classList.contains('post__like-button') &&
    evt.target.classList.contains('post__like-button_liked')
  ) {
    // дизлайки
    handlePostDislike(evt, currentPostId);
  } else if (evt.target.classList.contains('post__delete-button')) {
    // удаление поста
    handlePostDelete(currentPostId);
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
