import './pages/index.css';

import {
  addForm,
  editForm,
  postsContainerElement,
} from './components/constants.js';

import {
  handlePopupClick,
  handlePopupEsc,
  handleEditPopup,
  handleEditFormSubmit,
  handleAddPopup,
} from './components/modal.js';

import {
  renderInitialPosts,
  handleAddFormSubmit,
  handlePostEvents,
} from './components/card.js';

import { enableValidation } from './components/validate.js';

// ИНИЦИАЛИЗАЦИЯ
handleEditPopup(); // взаимодействие с формой редактирования профиля
handleAddPopup(); // взаимодействие с формой добавления нового поста
renderInitialPosts(); // отрисовка первоначальных постов
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__text-input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_disabled',
  inputErrorClass: 'form__text-input_error',
}); // включить валидацию форм

// EVENT LISTENERS
document.addEventListener('click', handlePopupClick); // закрыть модальное окно по клику на оверлей или на кнопку закрытия
document.addEventListener('keydown', handlePopupEsc); // закрыть модальное окно по нажатию на Esc
addForm.addEventListener('submit', handleAddFormSubmit); // отправка формы добавления нового поста
editForm.addEventListener('submit', handleEditFormSubmit); // отправка формы изменения персональных данных
postsContainerElement.addEventListener('click', handlePostEvents); // взаимодействие с постом
