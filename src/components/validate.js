// валидация форм
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__text-input_error');
  errorElement.textContent = errorMessage;
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__text-input_error');
  errorElement.textContent = '';
}

function validateFormInput(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit-button_disabled');
  } else {
    buttonElement.classList.remove('form__submit-button_disabled');
  }
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll('.form__text-input')
  );
  const buttonElement = formElement.querySelector('.form__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      validateFormInput(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation() {
  const forms = Array.from(document.forms);
  forms.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

export {
  showInputError,
  hideInputError,
  validateFormInput,
  hasInvalidInput,
  toggleButtonState,
  setEventListeners,
  enableValidation,
};
