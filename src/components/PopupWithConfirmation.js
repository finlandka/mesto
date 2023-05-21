import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open(idCard, elementCard) {
    super.open();
    this._idCard = idCard;
    this._elementCard = elementCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._idCard, this._elementCard);
      this.close();
    });
  }
}
