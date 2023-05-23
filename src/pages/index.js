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
const api = new Api(
  "https://nomoreparties.co/v1/cohort-66",
  "18f7db66-c3a4-4e8d-a393-391bdf601f7c"
);

//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  selectorName: ".profile__fullname",
  selectorPosition: ".profile__position",
  selectorAvatar: ".profile__avatar",
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

//функция вставки аватара с сервера на страницу
function loadAvatar() {
  avatar.style.backgroundImage = `url(${loaderImage})`;
  api
    .getUserInfo()
    .then((result) => {
      userInfo.setAvatar(result.avatar);
    })
    .catch((error) => console.log(error));
}

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
  return new Promise((resolve, reject) => {
    api
      .editAvatar(item)
      .then(() => {
        loadAvatar();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
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
function deleteCard(idCard, cardInstance) {
  return new Promise((resolve, reject) => {
    api
      .deleteCard(idCard)
      .then(() => {
        cardInstance.deleteImage();
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

//функция установки или удаления лайка
function toggleLike(cardId, isLike, cardInstance) {
  if (isLike) {
    return new Promise((resolve, reject) => {
      api
        .addLike(cardId)
        .then((result) => {
          cardInstance.loadLike(result);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      api
        .deleteLike(cardId)
        .then((result) => {
          cardInstance.loadLike(result);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}

//создание экземпляра классов Section, Card, PopupWithImage и применение метода отрисовки галереи
const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();

function addNewCard(card) {
  const newCard = new Card(
    card,
    "#galleryItem",
    () => {
      popupWithImage.open(card.name, card.link);
    },
    () => {
      popupWithFormDeleteCard.open(card._id, newCard);
    },
    (cardId, isLike) => {
      return toggleLike(cardId, isLike, newCard);
    },
    card,
    api.userId
  );
  return newCard;
}

const defaultGallery = new Section(
  {
    items: [],
    renderer: (card) => {
      defaultGallery.addItem(addNewCard(card).generateCard(card.likes.length));
    },
  },
  ".gallery"
);

//функция загрузки и отрисовки галереи
function loadGallery() {
  avatar.style.backgroundImage = `url(${loaderImage})`;
  Promise.all([api.getCards(), api.getUserInfo()])
    .then((result) => {
      defaultGallery.setItems(result[0].reverse());
      defaultGallery.renderItems();
      userInfo.setUserInfo({ name: result[1].name, position: result[1].about });
      userInfo.setAvatar(result[1].avatar);
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
  return new Promise((resolve, reject) => {
    api
      .addCard(card)
      .then((card) => {
        defaultGallery.addItem(
          addNewCard(card).generateCard(card.likes.length)
        );
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
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
    .catch((error) => {
      console.log(error);
    });
}

function openEditProfilePopup() {
  const userInfoGet = userInfo.getUserInfo();
  inputName.value = userInfoGet.name;
  inputPosition.value = userInfoGet.info;

  validationFormEditProfile.removeValidationErrors();
  validationFormEditProfile.toggleButtonState();

  popupWithFormEditProfile.open();
}
