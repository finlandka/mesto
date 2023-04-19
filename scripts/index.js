import { Card } from './Card.js';
import { FormValidator } from './validate.js';

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
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//глобальные переменные
const page = document.querySelector(".page");
const galleryUl = page.querySelector(".gallery");

const buttonOpenAddCardPopup = page.querySelector(".button_action_add");
const buttonOpenEditProfilePopup = page.querySelector(".button_action_edit");

const popupEditProfile = page.querySelector(".popup_edit-profile");
const popupAddCard = page.querySelector(".popup_add-card");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__button");
const buttonClosePopupEditProfile = popupEditProfile.querySelector(".popup__button");
const popupImage = page.querySelector(".popup_image");

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
    const galleryItem = new Card(image);
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

function pressEsc(popupTemplate, evt) {
  if (evt.key === "Escape") {
    closePopup(popupTemplate);
  }
}

function clickOverlay(popupTemplate, evt) {
  if (evt.target === popupTemplate) {
    closePopup(popupTemplate);
  }
}

function toggleEventListener(element, eventType, callback, isAdd) {
  if (isAdd) {
    element.addEventListener(eventType, callback);
  } else {
    element.removeEventListener(eventType, callback);
  }
}

//функция открытия попапа
function openPopup(popupTemplate) {
  popupTemplate.classList.add("popup_opened");
  //создаем новые функции с переданным popupTemplate
  const pressEscWrapper = (evt) => pressEsc(popupTemplate, evt);
  const clickOverlayWrapper = (evt) => clickOverlay(popupTemplate, evt);
  const closePopupWrapper = (evt) => closePopup(popupTemplate, evt);

  //  вешаем слушатель нажатия кнопки на документ
  toggleEventListener(document, "keydown", pressEscWrapper, true);
  //вешаем слушатель клика на оверлэй
  toggleEventListener(popupTemplate, "click", clickOverlayWrapper, true);

  //вешаем слушателя клика на крестик
  const buttonClosePopup = popupTemplate.querySelector(".button_action_close");
  toggleEventListener(buttonClosePopup, "click", closePopupWrapper, true);
}

//функция закрытия попапа
function closePopup(popupTemplate) {
  popupTemplate.classList.remove("popup_opened");

  const pressEscWrapper = (evt) => pressEsc(popupTemplate, evt);
  const clickOverlayWrapper = (evt) => clickOverlay(popupTemplate, evt);
  const closePopupWrapper = (evt) => closePopup(popupTemplate, evt);

  toggleEventListener(document, "keydown", pressEscWrapper, false);
  toggleEventListener(popupTemplate, "click", clickOverlayWrapper, false);

  const buttonClosePopup = popupTemplate.querySelector(".button_action_close");
  toggleEventListener(buttonClosePopup, "click", closePopupWrapper, false);
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
  galleryUl.prepend(new Card(newImage).generateCard());
  closePopup(popupAddCard);
}

//функция очистки ошибок валидации в верстке
function deleteErrors(popupTemplate) {
  const inputList = Array.from(
    popupTemplate.querySelectorAll(optionsClasses.inputSelector)
  );
  inputList.forEach((inputElement) => {
    new FormValidator(optionsClasses, popupTemplate).hideInputError(inputElement);
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