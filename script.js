// Элементы профиля
const profileContainer = document.querySelector('.profile__text');
const displayName = profileContainer.querySelector('.profile__name');
const displayBio = profileContainer.querySelector('.profile__bio');
const profileEditButton = document.querySelector('.profile__edit-button');

// Элементы формы редактирования профиля
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close-button');
const formElement = popupElement.querySelector('.form');
const nameInput = popupElement.querySelector('#name');
const bioInput = popupElement.querySelector('#bio');

// открыть и закрыть модальное окно
function togglePopup() {
  popupElement.classList.toggle('popup_opened');
}

function handleEditPopup() {
  profileEditButton.addEventListener('click', togglePopup);
  popupCloseButton.addEventListener('click', togglePopup);

  // заполнить поля текущими данными
  nameInput.value = displayName.textContent;
  bioInput.value = displayBio.textContent;
}

// отправка формы изменения персональных данных
function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const bio = bioInput.value;
  displayName.textContent = name;
  displayBio.textContent = bio;
  togglePopup();
}

handleEditPopup();
formElement.addEventListener('submit', handleFormSubmit);
