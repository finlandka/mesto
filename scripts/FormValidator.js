class FormValidator {
  constructor(options, formElement) {
    this._formSelector = options.formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;

    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const errorElement = this._formElement.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this.hideInputError(input);
    }
  }

  _setEventListeners(input) {
    this._toggleButtonState();
    input.addEventListener("input", () => {
      this._isValid(input);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._inputList.forEach((input) => {
      this._setEventListeners(input);
    });
  }
}

export { FormValidator };
