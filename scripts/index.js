import { openPopup, closePopup, toggleEventListener } from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const initialCards = [
  {
    name: "Байкал",
    link: "images/gallery-baikal.jpg",
  },
  {
    name: "Камчатка",
    link: "images/gallery-kamchatka.jpg",
  },
  {
    name: "Кижи",
    link: "images/gallery-kiji.jpg",
  },
  {
    name: "Онежское озеро",
    link: "images/gallery-lake-onejskoe.jpg",
  },
  {
    name: "Рыбачий полуостров",
    link: "images/gallery-pov-rybaci.jpg",
  },
  {
    name: "Сочи",
    link: "images/gallery-sochi.jpg",
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

//глобальные переменные
const page = document.querySelector(".page");
const galleryUl = page.querySelector(".gallery");

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

//рендеринг картинок
function loadGallery() {
  initialCards.forEach((image) => {
    const galleryItem = new Card(image, "#galleryItem");
    galleryUl.prepend(galleryItem.generateCard());
  });
}

loadGallery();

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

//функция открытия профиля
function openEditProfilePopup() {
  loadDataPopupEditProfile();
  deleteErrors(popupEditProfile);
  new FormValidator(optionsClasses, formEditProfile).enableValidation();
  openPopup(popupEditProfile);
}

//функция добавления картинок
function uploadPicture() {
  const newImage = { name: inputPlaceName.value, link: inputPlaceUrl.value };
  galleryUl.prepend(new Card(newImage, "#galleryItem").generateCard());
  closePopup(popupAddCard);
}

//функция очистки ошибок валидации в верстке
function deleteErrors(popupTemplate) {
  const inputList = Array.from(
    popupTemplate.querySelectorAll(optionsClasses.inputSelector)
  );
  inputList.forEach((inputElement) => {
    new FormValidator(optionsClasses, popupTemplate).hideInputError(
      inputElement
    );
  });
}

//функция открытия добавления картинок
function openAddCardPopup() {
  formAddCard.reset();
  new FormValidator(optionsClasses, formAddCard).enableValidation();
  deleteErrors(popupAddCard);
  openPopup(popupAddCard);
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
