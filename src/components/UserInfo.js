export default class UserInfo {
  constructor({ selectorName, selectorInfo }) {
    this._name = document.querySelector(selectorName);
    this._info = document.querySelector(selectorInfo);
  }

  getUserInfo() {
    return { name: this._name.textContent, info: this._info.textContent };
  }

  setUserInfo({ name, position }) {
    this._name.textContent = name;
    this._info.textContent = position;
  }
}
