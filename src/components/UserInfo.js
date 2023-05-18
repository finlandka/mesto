export default class UserInfo {
  constructor({ selectorName, selectorPosition }) {
    this._name = document.querySelector(selectorName);
    this._position = document.querySelector(selectorPosition);
  }

  getUserInfo() {
    return { name: this._name.textContent, info: this._position.textContent };
  }

  setUserInfo({ name, position }) {
    this._name.textContent = name;
    this._position.textContent = position;
  }
}
