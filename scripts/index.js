import { initialCards } from './constants.js';
import { openPopup, closePopup, toggleEventListener } from "./utils.js";
import Section from './Section.js';
import { Card } from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import { FormValidator } from "./FormValidator.js";

const optionsClasses = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//глобальные переменные
const page = document.querySelector(".page");

const buttonOpenAddCardPopup = page.querySelector(".button_action_add");
const buttonOpenEditProfilePopup = page.querySelector(".button_action_edit");

const popupEditProfile = page.querySelector(".popup_edit-profile");
const popupAddCard = page.querySelector(".popup_add-card");

const fullname = page.querySelector(".profile__fullname");
const position = page.querySelector(".profile__position");

const formEditProfile = page.querySelector("#formEditProfile");
const inputName = page.querySelector("#formName");
const inputPosition = page.querySelector("#formPosition");
const formAddCard = page.querySelector("#formAddCard");
const inputPlaceName = page.querySelector("#placeName");
const inputPlaceUrl = page.querySelector("#placeUrl");


const defaultGallery = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultGallery.addItem(new Card(
      item,
      "#galleryItem",
      () => {
        new PopupWithImage('.popup_image', item).open();
      }
      ).generateCard());
  }
}, '.gallery');

defaultGallery.renderItems();


function loadDataPopupEditProfile() {
  inputName.value = fullname.textContent;
  inputPosition.value = position.textContent;
}

loadDataPopupEditProfile();

//функция отправки формы изменения данных профиля
function submitEditProfileForm() {
  fullname.textContent = inputName.value;
  position.textContent = inputPosition.value;
  closePopup(popupEditProfile);
}

//создаем экземпляр класса валидации на каждую форму
const validationFormEditProfile = new FormValidator(optionsClasses, formEditProfile);
const validationFormAddCard = new FormValidator(optionsClasses, formAddCard);

validationFormEditProfile.enableValidation();
validationFormAddCard.enableValidation();

//функция открытия профиля
function openEditProfilePopup() {
  loadDataPopupEditProfile();
  validationFormEditProfile.removeValidationErrors();
  validationFormEditProfile.toggleButtonState();
  openPopup(popupEditProfile);
}

//функция открытия добавления картинок
function openAddCardPopup() {
  formAddCard.reset();
  validationFormAddCard.removeValidationErrors();
  validationFormAddCard.toggleButtonState();
  openPopup(popupAddCard);
}

//функция добавления картинок
function uploadPicture() {
  const newImage = { name: inputPlaceName.value, link: inputPlaceUrl.value };
  createCard(newImage);
  closePopup(popupAddCard);
}

//слушаем кнопки
toggleEventListener(
  buttonOpenEditProfilePopup,
  "click",
  openEditProfilePopup,
  true
);

toggleEventListener(buttonOpenAddCardPopup, "click", openAddCardPopup, true);

toggleEventListener(
  formAddCard,
  "submit",
  (evt) => {
    evt.preventDefault();
    uploadPicture();
  },
  true
);

toggleEventListener(
  formEditProfile,
  "submit",
  (evt) => {
    evt.preventDefault();
    submitEditProfileForm();
  },
  true
);
