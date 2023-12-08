import './pages/index.css';

import {
  addForm,
  editForm,
  displayName,
  displayBio,
  popupEditElement,
} from './components/constants.js';
import { handleEditPopup, handleAddPopup } from './components/modal.js';
import { renderInitialPosts, handleAddFormSubmit } from './components/card.js';
import { closePopup } from './components/utils.js';
import { enableValidation, hideInputError } from './components/validate.js';

// отправка формы изменения персональных данных
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  displayName.textContent = username.value;
  displayBio.textContent = bio.value;
  closePopup(popupEditElement);
}

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
enableValidation(validationSettings); // включить валидацию форм
handleEditPopup(); // взаимодействие с формой редактирования профиля
handleAddPopup(); // взаимодействие с формой добавления нового поста
renderInitialPosts(); // отрисовка первоначальных постов

// EVENT LISTENERS
addForm.addEventListener('submit', handleAddFormSubmit); // отправка формы добавления нового поста
editForm.addEventListener('submit', handleEditFormSubmit); // отправка формы изменения персональных данных
