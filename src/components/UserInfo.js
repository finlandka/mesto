export default class UserInfo {
  constructor({ name, info }) {
    this._name = name;
    this._info = info;
  }

  getUserInfo() {
    return { name: this._name.textContent, info: this._info.textContent };
  }

  setUserInfo() {
    this._name.value = this.getUserInfo().name;
    this._info.value = this.getUserInfo().info;
  }
}
