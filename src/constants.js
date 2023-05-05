import baikal from './images/gallery-baikal.jpg';
import kamchatka from './images/gallery-kamchatka.jpg';
import kiji from './images/gallery-kiji.jpg';
import ozero from './images/gallery-lake-onejskoe.jpg';
import island from './images/gallery-pov-rybaci.jpg';
import sochi from './images/gallery-sochi.jpg';

const initialCards = [
  {
    name: "Байкал",
    link: baikal,
  },
  {
    name: "Камчатка",
    link: kamchatka,
  },
  {
    name: "Кижи",
    link: kiji,
  },
  {
    name: "Онежское озеро",
    link: ozero,
  },
  {
    name: "Рыбачий полуостров",
    link: island,
  },
  {
    name: "Сочи",
    link: sochi,
  },
];

const optionsClasses = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const page = document.querySelector(".page");
const gallery = page.querySelector(".gallery");

const buttonOpenAddCardPopup = page.querySelector(".button_action_add");
const buttonOpenEditProfilePopup = page.querySelector(".button_action_edit");

const popupEditProfile = page.querySelector(".popup_edit-profile");
const popupAddCard = page.querySelector(".popup_add-card");
const popupImage = page.querySelector(".popup_image");

const fullname = page.querySelector(".profile__fullname");
const position = page.querySelector(".profile__position");

const formEditProfile = page.querySelector("#formEditProfile");
const inputName = page.querySelector("#formName");
const inputPosition = page.querySelector("#formPosition");
const formAddCard = page.querySelector("#formAddCard");

export {
  initialCards,
  optionsClasses,
  gallery,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  popupEditProfile,
  popupAddCard,
  popupImage,
  fullname,
  position,
  formEditProfile,
  inputName,
  inputPosition,
  formAddCard,
};
