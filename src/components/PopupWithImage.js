import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageInPopup = this._popup.querySelector(".popup__image");
    this._imageDescPopup = this._popup.querySelector(".popup__desc");
  }
  open(name, link) {
    super.open();
    this._imageInPopup.src = link;
    this._imageInPopup.alt = name;
    this._imageDescPopup.textContent = name;
  }
}
