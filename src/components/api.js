const TOKEN = 'ee0956cc-88d8-4912-8bbc-58b6d84714ec';
const URL = 'https://nomoreparties.co/v1/wbf-cohort-15';

export function getUserInfo() {
  return fetch(`${URL}/users/me`, {
    headers: {
      authorization: TOKEN,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function updateProfineInfo(name, about) {
  return fetch(`${URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function updateAvatar(avatarLink) {
  return fetch(`${URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function getPosts() {
  return fetch(`${URL}/cards`, {
    headers: {
      authorization: TOKEN,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function addPost(name, link) {
  return fetch(`${URL}/cards`, {
    method: 'POST',
    headers: {
      authorization: TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function deletePost(postId) {
  return fetch(`${URL}/cards/${postId}`, {
    method: 'DELETE',
    headers: {
      authorization: TOKEN,
    },
  }).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
}
