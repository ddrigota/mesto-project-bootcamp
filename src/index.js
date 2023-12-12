import './pages/index.css';

import {
  addForm,
  editForm,
  avatarForm,
  postsContainerElement,
} from './components/constants.js';

import {
  handleEditPopup,
  handleEditFormSubmit,
  handleAvatarPopup,
  handleAvatarFormSubmit,
  renderProfile,
} from './components/profile.js';

import {
  handleAddPopup,
  createPostElement,
  handleAddFormSubmit,
} from './components/card.js';

import { enableValidation, validationSettings } from './components/validate.js';

import { getUserInfo, getPosts } from './components/api.js';

let myId;

getUserInfo()
  .then((data) => {
    myId = data._id;
  })
  .catch(console.error);

function renderData() {
  Promise.all([getUserInfo(), getPosts()])
    .then(([userInfo, posts]) => {
      myId = userInfo._id;
      renderProfile(userInfo);
      posts.forEach((post) => {
        const postElement = createPostElement(post, myId);
        postsContainerElement.append(postElement);
      });
    })
    .catch(console.error);
}

// ИНИЦИАЛИЗАЦИЯ
renderData(); // отрисовать данные пользователя и посты
handleEditPopup(); // взаимодействие с формой редактирования профиля
handleAddPopup(); // взаимодействие с формой добавления нового поста
handleAvatarPopup(); // взаимодействие с формой изменения аватара
enableValidation(validationSettings); // включить валидацию форм

// EVENT LISTENERS
addForm.addEventListener('submit', handleAddFormSubmit); // отправка формы добавления нового поста
editForm.addEventListener('submit', handleEditFormSubmit); // отправка формы изменения персональных данных
avatarForm.addEventListener('submit', handleAvatarFormSubmit); // отправка формы изменения аватара
