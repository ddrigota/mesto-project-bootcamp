// открыть модальное окно
export function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}
// закрыть модальное окно
export function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}
