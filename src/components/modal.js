import {
  profileEditButton,
  popupEditElement,
  username,
  displayName,
  displayBio,
  bio,
  addButton,
  popupAddElement,
} from './constants.js';

import { openPopup, closePopup } from './utils.js';

// взаимодействие с формой редактирования профиля
function handleEditPopup() {
  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditElement);
    // заполнить поля текущими данными
    username.value = displayName.textContent;
    bio.value = displayBio.textContent;
  });
}

// открытие и закрытие окна "добавить новый пост"
function handleAddPopup() {
  addButton.addEventListener('click', () => {
    openPopup(popupAddElement);
  });
}

export { handleEditPopup, handleAddPopup };
