import {
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
} from "./constants.js";
import Section from "./Section.js";
import Card from "./Card.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import FormValidator from "./FormValidator.js";

//создание экземпляра класса Section и Card и применение метода отрисовки
const defaultGallery = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      defaultGallery.addItem(
        new Card(item, "#galleryItem", () => {
          new PopupWithImage(popupImage, item).open();
        }).generateCard()
      );
    },
  },
  gallery
);

defaultGallery.renderItems();

//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  name: fullname,
  info: position,
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
    new PopupWithImage(popupImage, item).open();
  }).generateCard();
  gallery.prepend(newCard);
}

//создаем экземпляр класса попапа формы добавления
const classPopupAddCard = new PopupWithForm({
  selector: popupAddCard,
  handleFormSubmit: uploadPicture,
});

//функция открытия добавления картинок
function openAddCardPopup() {
  validationFormAddCard.removeValidationErrors();
  validationFormAddCard.toggleButtonState();

  classPopupAddCard.open();
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

//создаем экземпляр класса попапа формы редактирования
const classPopupEditProfile = new PopupWithForm({
  selector: popupEditProfile,
  handleFormSubmit: submitEditProfileForm,
});

//функция отправки формы изменения данных профиля
function submitEditProfileForm(item) {
  fullname.textContent = item.name;
  position.textContent = item.position;
}

//функция открытия профиля
function openEditProfilePopup() {
  inputName.value = userInfo.getUserInfo().name;
  inputPosition.value = userInfo.getUserInfo().info;

  validationFormEditProfile.removeValidationErrors();
  validationFormEditProfile.toggleButtonState();

  classPopupEditProfile.open();
}
