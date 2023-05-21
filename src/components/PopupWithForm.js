import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleFormSubmit }) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });

    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitButton.textContent = "Сохранение...";
      this._handleFormSubmit(this._getInputValues())
        .then(() => {
          this.close();
        })
        .catch((error) => console.log(error));
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._submitButton.textContent = this._submitButtonText;
  }
}
