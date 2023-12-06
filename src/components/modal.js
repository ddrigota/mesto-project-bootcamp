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

// закрыть модальное окно по клику на оверлей или на кнопку закрытия
function handlePopupClick(evt) {
  const currentPopupElement = document.querySelector('.popup_opened');
  if (
    evt.target.classList.contains('popup') ||
    evt.target.classList.contains('popup__close-button')
  ) {
    closePopup(currentPopupElement);
  }
}

// закрыть модальное окно по нажатию на Esc
function handlePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const currentPopupElement = document.querySelector('.popup_opened');
    closePopup(currentPopupElement);
  }
}

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

// открытие и закрытие окна "добавить новый пост"
function handleAddPopup() {
  addButton.addEventListener('click', () => {
    openPopup(popupAddElement);
  });
}

export {
  handlePopupClick,
  handlePopupEsc,
  handleEditPopup,
  handleEditFormSubmit,
  handleAddPopup,
};
