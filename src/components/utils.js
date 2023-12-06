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
  if (popupElement.id === 'popup-add' || popupElement.id === 'popup-edit') {
    popupElement.querySelector('.form').reset();
  }
}
