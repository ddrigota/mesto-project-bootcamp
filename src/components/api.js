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

// я пока не добавлял baseUrl в fetch, на мой взгляд, так читабельнее
function request(url, method, body) {
  return fetch(url, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(body),
  }).then(checkResponse);
}

export function getUserInfo() {
  return request(`${config.baseUrl}/users/me`, 'GET');
}

export function updateProfileInfo(name, about) {
  return request(`${config.baseUrl}/users/me`, 'PATCH', {
    name: name,
    about: about,
  });
}

export function updateAvatar(avatarLink) {
  return request(`${config.baseUrl}/users/me/avatar`, 'PATCH', {
    avatar: avatarLink,
  });
}

export function getPosts() {
  return request(`${config.baseUrl}/cards`, 'GET');
}

export function addPost(name, link) {
  return request(`${config.baseUrl}/cards`, 'POST', {
    name: name,
    link: link,
  });
}

export function deletePost(postId) {
  return request(`${config.baseUrl}/cards/${postId}`, 'DELETE');
}

export function likePost(postId) {
  return request(`${config.baseUrl}/cards/likes/${postId}`, 'PUT');
}

export function dislikePost(postId) {
  return request(`${config.baseUrl}/cards/likes/${postId}`, 'DELETE');
}
