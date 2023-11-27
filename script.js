// открытие модального окна
const profileContainerElement = document.querySelector('.profile__text');
const displayName = profileContainerElement.querySelector('.profile__name');
const displayBio = profileContainerElement.querySelector('.profile__bio');

function handlePopup() {
  const profileEditButton = document.querySelector('.profile__edit-button');
  const popupElement = document.querySelector('.popup');
  const popupCloseButton = popupElement.querySelector('.popup__close-button');
  const nameForm = popupElement.querySelector('#name');
  const bioForm = popupElement.querySelector('#bio');

  profileEditButton.addEventListener('click', () => {
    popupElement.classList.toggle('popup_opened');
  });
  popupCloseButton.addEventListener('click', () => {
    popupElement.classList.toggle('popup_opened');
  });

  nameForm.value = displayName.textContent;
  bioForm.value = displayBio.textContent;
}

handlePopup();
