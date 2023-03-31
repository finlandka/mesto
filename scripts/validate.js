function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(options, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(options.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(options.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function showInputError(options, formElement, inputElement, errorMessage) {
  inputElement.classList.add(options.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(options.errorClass);
}

function hideInputError(options, formElement, inputElement) {
  inputElement.classList.remove(options.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(options.errorClass);
}

function isValid(options, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(
      options,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(options, formElement, inputElement);
  }
}

function setEventListeners(options, formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const buttonElement = formElement.querySelector(options.submitButtonSelector);
  toggleButtonState(options, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(options, formElement, inputElement);
      toggleButtonState(options, inputList, buttonElement);
    });
  });
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(options, formElement);
  });
}

enableValidation(optionsClasses);
