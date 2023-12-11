// TODO: сделать и протестировать универсальную функцию запроса на сервер

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-15',
  headers: {
    authorization: 'ee0956cc-88d8-4912-8bbc-58b6d84714ec',
    'Content-Type': 'application/json',
  },
};

export const myId = '86f8732160a3d589d063f4ea';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function updateProfileInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

export function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then(checkResponse);
}

export function getPosts() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function addPost(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function deletePost(postId) {
  return fetch(`${config.baseUrl}/cards/${postId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}

export function likePost(postId) {
  return fetch(`${config.baseUrl}/cards/likes/${postId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then(checkResponse);
}

export function dislikePost(postId) {
  return fetch(`${config.baseUrl}/cards/likes/${postId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(checkResponse);
}
