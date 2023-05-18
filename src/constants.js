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

const buttonOpenAddCardPopup = page.querySelector(".button_action_add");
const buttonOpenEditProfilePopup = page.querySelector(".button_action_edit");

const formEditProfile = page.querySelector("#formEditProfile");
const inputName = page.querySelector("#formName");
const inputPosition = page.querySelector("#formPosition");
const formAddCard = page.querySelector("#formAddCard");
const inputAvatarUrl = page.querySelector("#avatarUrl");

const fullname = page.querySelector('.profile__fullname');
const position = page.querySelector('.profile__position');
const avatar = page.querySelector('.profile__avatar');

export {
  initialCards,
  optionsClasses,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  formEditProfile,
  inputName,
  inputPosition,
  formAddCard,
  fullname,
  position,
  avatar,
  inputAvatarUrl
};
