import "./index.css";
import {
  optionsClasses,
  loaderImage,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  formEditProfile,
  inputName,
  inputPosition,
  formAddCard,
  avatar,
  formEditAvatar,
} from "../constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

//создание экземпляра класса Api
const api = new Api("cohort-66", "18f7db66-c3a4-4e8d-a393-391bdf601f7c");

//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  selectorName: ".profile__fullname",
  selectorPosition: ".profile__position",
});

//функция вставки данных юзера с сервера на страницу профиля
function loadUserInfo() {
  api
    .getUserInfo()
    .then((result) => {
      userInfo.setUserInfo({ name: result.name, position: result.about });
    })
    .catch((err) => console.log(`Ошибка: ${err}`));
}
loadUserInfo();

//функция вставки аватара с сервера на страницу
function loadAvatar() {
  avatar.style.backgroundImage = `url(${loaderImage})`;
  api
    .getUserInfo()
    .then((result) => {
      avatar.style.backgroundImage = `url(${result.avatar})`;
    })
    .catch((error) => console.log(error));
}
loadAvatar();

//форма редактирования аватара
avatar.addEventListener("click", openEditAvatarPopup);

const validationFormEditAvatar = new FormValidator(
  optionsClasses,
  formEditAvatar
);
validationFormEditAvatar.enableValidation();

const popupWithFormEditAvatar = new PopupWithForm({
  selector: ".popup_edit-avatar",
  handleFormSubmit: editAvatar,
});
popupWithFormEditAvatar.setEventListeners();

function editAvatar(item) {
  return api
    .editAvatar(item)
    .then(() => {
      loadAvatar();
    })
    .catch((error) => console.log(error));
}

function openEditAvatarPopup() {
  formEditAvatar.link.value = avatar.style.backgroundImage.slice(5, -2);
  validationFormEditAvatar.removeValidationErrors();
  validationFormEditAvatar.toggleButtonState();
  popupWithFormEditAvatar.open();
}

//создание экземпляра класса попапа подтверждения удаления
const popupWithFormDeleteCard = new PopupWithConfirmation({
  selector: ".popup_delete-card",
  handleFormSubmit: deleteCard,
});
popupWithFormDeleteCard.setEventListeners();

//функция удаления карточки
function deleteCard(idCard, elementCard) {
  return api
    .deleteCard(idCard)
    .then(() => {
      elementCard.remove();
    })
    .catch((error) => console.log(error));
}

//функция установки или удаления лайка
function toggleLike(cardId, isLike, countElement) {
  if (isLike) {
    countElement.textContent = Number(countElement.textContent) + 1;
    api
      .addLike(cardId)
      .then((result) => {
        countElement.textContent = result.likes.length;
      })
      .catch((error) => console.log(error));
  } else {
    countElement.textContent = Number(countElement.textContent) - 1;
    api
      .deleteLike(cardId)
      .then((result) => {
        countElement.textContent = result.likes.length;
      })
      .catch((error) => console.log(error));
  }
}

//создание экземпляра классов Section, Card, PopupWithImage и применение метода отрисовки галереи
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

const defaultGallery = new Section(
  {
    items: [],
    renderer: (card) => {
      defaultGallery.addItem(
        new Card(
          card,
          "#galleryItem",
          () => {
            popupWithImage.open(card.name, card.link);
          },
          (elementCard) => {
            popupWithFormDeleteCard.open(card._id, elementCard);
          },
          toggleLike,
          card
        ).generateCard(card.likes.length)
      );
    },
  },
  ".gallery"
);

//функция загрузки и отрисовки галереи
function loadGallery() {
  api
    .getCards()
    .then((result) => {
      defaultGallery.setItems(result.reverse());
      return defaultGallery;
    })
    .then((result) => {
      result.renderItems();
    })
    .catch((error) => {
      console.log(error);
    });
}
loadGallery();

//форма добавления карточки
buttonOpenAddCardPopup.addEventListener("click", openAddCardPopup);

const validationFormAddCard = new FormValidator(optionsClasses, formAddCard);
validationFormAddCard.enableValidation();

const popupWithFormAddCard = new PopupWithForm({
  selector: ".popup_add-card",
  handleFormSubmit: uploadPicture,
});
popupWithFormAddCard.setEventListeners();

function uploadPicture(card) {
  return api
    .addCard(card)
    .then((card) => {
      return new Card(
        card,
        "#galleryItem",
        () => {
          popupWithImage.open(card.name, card.link);
        },
        (elementCard) => {
          popupWithFormDeleteCard.open(card._id, elementCard);
        },
        toggleLike,
        card
      ).generateCard(card.likes.length);
    })
    .then((element) => {
      defaultGallery.addItem(element);
    })
    .catch((error) => console.log(error));
}

function openAddCardPopup() {
  validationFormAddCard.removeValidationErrors();
  validationFormAddCard.toggleButtonState();
  popupWithFormAddCard.open();
}

//форма редактирования профиля
buttonOpenEditProfilePopup.addEventListener("click", openEditProfilePopup);

const validationFormEditProfile = new FormValidator(
  optionsClasses,
  formEditProfile
);
validationFormEditProfile.enableValidation();

const popupWithFormEditProfile = new PopupWithForm({
  selector: ".popup_edit-profile",
  handleFormSubmit: submitEditProfileForm,
});
popupWithFormEditProfile.setEventListeners();

function submitEditProfileForm(item) {
  return api
    .editProfile(item)
    .then(() => {
      loadUserInfo();
    })
    .catch((error) => console.log(error));
}

function openEditProfilePopup() {
  const userInfoGet = userInfo.getUserInfo();
  inputName.value = userInfoGet.name;
  inputPosition.value = userInfoGet.info;

  validationFormEditProfile.removeValidationErrors();
  validationFormEditProfile.toggleButtonState();

  popupWithFormEditProfile.open();
}
