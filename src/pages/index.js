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
  fullname,
  position,
  avatar,
  inputAvatarUrl
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
const api = new Api('cohort-66', '18f7db66-c3a4-4e8d-a393-391bdf601f7c');

//создание экземпляра класса UserInfo
const userInfo = new UserInfo({
  selectorName: '.profile__fullname',
  selectorPosition: '.profile__position',
});

//вставляем данные юзера с сервера на страницу профиля
function loadUserInfo(){
  api.getUserInfo()
  .then(result => {
    userInfo.setUserInfo({name:result.name, position:result.about})
  })
  .catch(err => console.log(`Ошибка: ${err}`))
}
loadUserInfo();

function loadAvatar() {
  api.getUserInfo()
    .then(result => {
      avatar.src = result.avatar;
    })
    .catch(error => console.log(error))
}
loadAvatar();

avatar.addEventListener('click', openEditAvatarPopup);

const validationFormEditAvatar = new FormValidator(optionsClasses, formEditAvatar);
validationFormEditAvatar.enableValidation();

const popupWithFormEditAvatar = new PopupWithForm({
  selector: '.popup_edit-avatar',
  handleFormSubmit: () => {},
});
popupWithFormEditAvatar.setEventListeners();

function openEditAvatarPopup() {
  inputAvatarUrl.value = avatar.src;
  validationFormEditAvatar.removeValidationErrors();
  validationFormEditAvatar.toggleButtonState();

  popupWithFormEditAvatar.open();
}

const popupWithFormDeleteCard = new PopupWithConfirmation({
  selector: '.popup_delete-card',
  handleFormSubmit: deleteCard
});
popupWithFormDeleteCard.setEventListeners();

function deleteCard(idCard) {
  api.deleteCard(idCard);
  loadGallery();
}

function toggleLike(cardId, isLike) {
  console.log(cardId, isLike);
  if(isLike) {
    api.addLike(cardId)
  } else {
    api.deleteLike(cardId)
  }
  loadGallery();
}

//создание экземпляра классов Section, Card, PopupWithImage и применение метода отрисовки

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const defaultGallery = new Section({
  items: [],
  renderer: (card) => {
    defaultGallery.addItem(
      new Card(
        card, 
        '#galleryItem', 
        () => {
          popupWithImage.open(card.name, card.link);
        },
        () => {
          popupWithFormDeleteCard.open(card._id);
        },
        toggleLike,
        card
      ).generateCard(card.likes.length)
    )
  }
}, '.gallery');

function loadGallery() {
  api.getCards()
    .then(value => {
      defaultGallery.setItems(value);
      defaultGallery.renderItems();
      return defaultGallery;
    })
    .catch(error => {console.log(error)})
}

loadGallery();

/////////Edit add card

//слушаем кнопку
buttonOpenAddCardPopup.addEventListener("click", openAddCardPopup);

//создаем экземпляр класса валидации
const validationFormAddCard = new FormValidator(optionsClasses, formAddCard);
validationFormAddCard.enableValidation();

//функция загрузки картинки
function uploadPicture(card) {
  api.addCard(card)
    .then(() => {
      loadGallery();
      }
    )
    .catch(error => console.log(error))
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
  api.editProfile(item)
    .then(() => {
      loadUserInfo();
    });
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
