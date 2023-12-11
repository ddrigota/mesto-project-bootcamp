// взаимодействие с формой редактирования профиля
import {
  profileEditButton,
  popupEditElement,
  username,
  displayName,
  displayBio,
  bio,
  displayAvatar,
  avatarEditButton,
  popupAvatarElement,
  avatar,
} from './constants.js';

import { openPopup, closePopup, renderLoading } from './utils.js';
import { resetFormErrors, validationSettings } from '../index.js';

import { getUserInfo, updateProfineInfo, updateAvatar } from './api.js';

export function renderInitialProfile() {
  getUserInfo()
    .then((data) => {
      renderProfile(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function renderProfile(data) {
  displayName.textContent = data.name;
  displayBio.textContent = data.about;
  displayAvatar.src = data.avatar;
}

export function handleEditPopup() {
  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditElement);
    resetFormErrors(popupEditElement, validationSettings); // очистить ошибки формы при открытии
    // заполнить поля текущими данными
    username.value = displayName.textContent;
    bio.value = displayBio.textContent;
  });
}

export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupEditElement);
  updateProfineInfo(username.value, bio.value)
    .then((data) => {
      renderProfile(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupEditElement);
    });
  closePopup(popupEditElement);
}

export function handleAvatarPopup() {
  avatarEditButton.addEventListener('click', () => {
    openPopup(popupAvatarElement);
    resetFormErrors(popupAvatarElement, validationSettings); // очистить ошибки формы при открытии
  });
}

export function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, popupAvatarElement);
  updateAvatar(avatar.value)
    .then((data) => {
      renderProfile(data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, popupAvatarElement);
    });

  closePopup(popupAvatarElement);
}
