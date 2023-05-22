export default class UserInfo {
  constructor({ selectorName, selectorPosition, selectorAvatar }) {
    this._name = document.querySelector(selectorName);
    this._position = document.querySelector(selectorPosition);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return { name: this._name.textContent, info: this._position.textContent };
  }

  setUserInfo({ name, position }) {
    this._name.textContent = name;
    this._position.textContent = position;
  }

  setAvatar(url) {
    this._avatar.style.backgroundImage = `url(${url})`;
  }
}
