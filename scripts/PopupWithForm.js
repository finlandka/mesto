import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._formName = this._selector.querySelector(".popup__form");
  }

  _getInputValues() {
    this._inputList = this._selector.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.addEventListener("submit", this._handleSubmit);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
    this.close();
  }

  removeEventListeners() {
    this._selector.removeEventListener("submit", this._handleSubmit);
  }

  close() {
    super.close();
    this.removeEventListeners();
    this._formName.reset();
  }
}
