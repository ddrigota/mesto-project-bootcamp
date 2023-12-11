import { closePopup } from './utils.js';

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

export { handlePopupClick, handlePopupEsc };
