import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector, data) {
    super(selector);
    this._name = data.name;
    this._link = data.link;
    this._imageInPopup = this._selector.querySelector(".popup__image");
    this._imageDescPopup = this._selector.querySelector(".popup__desc");
  }
  open() {
    super.open();
    this._imageInPopup.src = this._link;
    this._imageInPopup.alt = this._name;
    this._imageDescPopup.textContent = this._name;
  }
}