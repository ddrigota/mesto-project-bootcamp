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
import { resetFormErrors, validationSettings } from '../index.js';

// взаимодействие с формой редактирования профиля
function handleEditPopup(hideInputError) {
  profileEditButton.addEventListener('click', () => {
    openPopup(popupEditElement);
    resetFormErrors(popupEditElement, validationSettings); // очистить ошибки формы при открытии
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

export { handleEditPopup, handleAddPopup, handlePopupClick, handlePopupEsc };
