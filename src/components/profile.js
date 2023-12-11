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
import { resetFormErrors, validationSettings } from './validate.js';
import { updateProfileInfo, updateAvatar } from './api.js';

export function renderProfile(data) {
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
  updateProfileInfo(username.value, bio.value)
    .then((data) => {
      renderProfile(data);
      closePopup(popupEditElement); // Move this line here
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, popupEditElement);
    });
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
      closePopup(popupAvatarElement); // Move this line here
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, popupAvatarElement);
    });
}
