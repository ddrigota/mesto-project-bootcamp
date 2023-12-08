import { handlePopupEsc, handlePopupClick } from './modal.js';

// открыть модальное окно
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupEsc); // закрыть модальное окно по нажатию на Esc
  document.addEventListener('click', handlePopupClick); // закрыть модальное окно по клику на оверлей или на кнопку закрытия
}

// закрыть модальное окно
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupEsc); // закрыть модальное окно по нажатию на Esc
  document.removeEventListener('click', handlePopupClick); // закрыть модальное окно по клику на оверлей или на кнопку закрытия
}
