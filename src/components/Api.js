
export default class Api {
  constructor(cohortId, token){
    this._cohortId = cohortId;
    this._token = token;
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  getCards(){
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  editProfile(data) {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        about: data.position
      })
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  editAvatar(data) {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  addCard(data) {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then(res => {
        if(res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  deleteCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
        if(res.ok) {
            return Promise.resolve();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }) 
  }

  addLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
      if(res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

  deleteLike(cardId) {
    return fetch(`https://nomoreparties.co/v1/${this._cohortId}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(res => {
      if(res.ok) {
          return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
  }

}