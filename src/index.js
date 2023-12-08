import './pages/index.css';

import {
  addForm,
  editForm,
  displayName,
  displayBio,
  addButton,
  popupAddElement,
  popupEditElement,
} from './components/constants.js';

import { handleEditPopup, handleAddPopup } from './components/modal.js';

import { renderInitialPosts, handleAddFormSubmit } from './components/card.js';
import { closePopup } from './components/utils.js';
import { enableValidation } from './components/validate.js';

// ИНИЦИАЛИЗАЦИЯ

// отправка формы изменения персональных данных
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  displayName.textContent = username.value;
  displayBio.textContent = bio.value;
  closePopup(popupEditElement);
}

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_error',
  errorClass: 'form__error-message_visible',
};

enableValidation(validationSettings); // включить валидацию форм
handleEditPopup(); // взаимодействие с формой редактирования профиля
handleAddPopup(); // взаимодействие с формой добавления нового поста
renderInitialPosts(); // отрисовка первоначальных постов

// EVENT LISTENERS
addForm.addEventListener('submit', handleAddFormSubmit); // отправка формы добавления нового поста
editForm.addEventListener('submit', handleEditFormSubmit); // отправка формы изменения персональных данных
