import './pages/index.css';

import { addForm, editForm, avatarForm } from './components/constants.js';
import {
  handleEditPopup,
  handleEditFormSubmit,
  handleAvatarPopup,
  handleAvatarFormSubmit,
} from './components/profile.js';
import {
  handleAddPopup,
  renderInitialPosts,
  handleAddFormSubmit,
} from './components/card.js';
import { enableValidation, hideInputError } from './components/validate.js';
import { renderInitialProfile } from './components/profile.js';
// отправка формы изменения персональных данных

export function resetFormErrors(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(
      formElement,
      inputElement,
      validationSettings.inputErrorClass,
      validationSettings.errorClass
    );
  });
}

// настройки валидации
export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_error',
  errorClass: 'form__error-message_visible',
};

// ИНИЦИАЛИЗАЦИЯ
renderInitialProfile(); // отрисовка первоначальных данных профиля
enableValidation(validationSettings); // включить валидацию форм
handleEditPopup(); // взаимодействие с формой редактирования профиля
handleAddPopup(); // взаимодействие с формой добавления нового поста
handleAvatarPopup(); // взаимодействие с формой изменения аватара
renderInitialPosts(); // отрисовка первоначальных постов

// EVENT LISTENERS
addForm.addEventListener('submit', handleAddFormSubmit); // отправка формы добавления нового поста
editForm.addEventListener('submit', handleEditFormSubmit); // отправка формы изменения персональных данных
avatarForm.addEventListener('submit', handleAvatarFormSubmit); // отправка формы изменения аватара
