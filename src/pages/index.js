import './index.css';
import {
  initialCards,
  optionsClasses,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  formEditProfile,
  inputName,
  inputPosition,
  formAddCard,
} from "../constants.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";


//создание экземпляра классов Section, Card, PopupWithImage и применение метода отрисовки

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const defaultGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultGallery.addItem(
        new Card(item, "#galleryItem", () => {
          popupWithImage.open(item.name, item.link);
        }).generateCard()
      );
    },
  },
  '.gallery'
);

defaultGallery.renderItems();

//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  selectorName: '.profile__fullname',
  selectorInfo: '.profile__position',
});

/////////Edit add card

//слушаем кнопку
buttonOpenAddCardPopup.addEventListener("click", openAddCardPopup);

//создаем экземпляр класса валидации
const validationFormAddCard = new FormValidator(optionsClasses, formAddCard);
validationFormAddCard.enableValidation();

//функция загрузки картинки
function uploadPicture(item) {
  const newCard = new Card(item, "#galleryItem", () => {
    popupWithImage.open(item.name, item.link);
    popupWithImage.setEventListeners();
  }).generateCard();
  defaultGallery.addItem(newCard);
}

//создаем экземпляр класса попапа формы добавления и вешаем листенер
const popupWithFormAddCard = new PopupWithForm({
  selector: '.popup_add-card',
  handleFormSubmit: uploadPicture,
});
popupWithFormAddCard.setEventListeners();

//функция открытия добавления картинок
function openAddCardPopup() {
  validationFormAddCard.removeValidationErrors();
  validationFormAddCard.toggleButtonState();

  popupWithFormAddCard.open();
}

/////////////////////Edit profile

//слушаем кнопку
buttonOpenEditProfilePopup.addEventListener("click", openEditProfilePopup);

//создаем экземпляр класса валидации
const validationFormEditProfile = new FormValidator(
  optionsClasses,
  formEditProfile
);
validationFormEditProfile.enableValidation();

//создаем экземпляр класса попапа формы редактирования и вешаем листенер
const popupWithFormEditProfile = new PopupWithForm({
  selector: '.popup_edit-profile',
  handleFormSubmit: submitEditProfileForm,
});
popupWithFormEditProfile.setEventListeners();

//функция отправки формы изменения данных профиля
function submitEditProfileForm(item) {
  userInfo.setUserInfo(item);
}

//функция открытия профиля
function openEditProfilePopup() {
  const userInfoGet = userInfo.getUserInfo();
  inputName.value = userInfoGet.name;
  inputPosition.value = userInfoGet.info;

  validationFormEditProfile.removeValidationErrors();
  validationFormEditProfile.toggleButtonState();

  popupWithFormEditProfile.open();
}
