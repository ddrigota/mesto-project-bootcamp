// элементы профиля
const profileContainer = document.querySelector('.profile__text');
const displayName = profileContainer.querySelector('.profile__name');
const displayBio = profileContainer.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditElement = document.querySelector('#popup-edit');
const displayAvatar = document.querySelector('.profile__avatar');
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const popupAvatarElement = document.querySelector('#popup-edit-avatar');

const editForm = document.forms.userinfo;
const username = editForm.elements.username;
const bio = editForm.elements.bio;
const avatarForm = document.forms.avatar;
const avatar = avatarForm.elements.avatar;

// элементы создания нового поста
const addButton = document.querySelector('.profile__add-button');
const popupAddElement = document.querySelector('#popup-add');
const addForm = document.forms.newpost;
const caption = addForm.elements.caption;
const link = addForm.elements.link;

// грид с постами
const postsContainerElement = document.querySelector('.posts-grid__list');
const postTemplate = document.querySelector('#post-template').content;

// элементы модального окна с картинкой
const popupImageElement = document.querySelector('#popup-image-preview');
const popupImage = popupImageElement.querySelector('.popup__image');
const popupImageCaption = popupImageElement.querySelector(
  '.popup__image-description'
);

export {
  profileContainer,
  displayName,
  displayBio,
  profileEditButton,
  popupEditElement,
  editForm,
  username,
  bio,
  addButton,
  popupAddElement,
  addForm,
  caption,
  link,
  postsContainerElement,
  postTemplate,
  popupImageElement,
  popupImage,
  popupImageCaption,
  displayAvatar,
  avatarEditButton,
  popupAvatarElement,
  avatarForm,
  avatar,
};
