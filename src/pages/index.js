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
  avatar
} from "../constants.js";
import Api from "../components/Api.js";
import Section from "../components/Section.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";

//создание экземпляра класса Api
const api = new Api('cohort-66', '18f7db66-c3a4-4e8d-a393-391bdf601f7c');

//вставляем данные юзера с сервера на страницу профиля
function loadUserInfo(){
  api.getUserInfo()
  .then(userInfoApi => {
    fullname.textContent = userInfoApi.name;
    position.textContent = userInfoApi.about;
    avatar.src = userInfoApi.avatar;
  })
  .catch(err => console.log(`Ошибка: ${err}`))
}
loadUserInfo();



//создание экземпляра классов Section, Card, PopupWithImage и применение метода отрисовки

const popupWithImage = new PopupWithImage('.popup_image');
popupWithImage.setEventListeners();

const defaultGallery = new Section({
  items: [],
  renderer: (card) => {
    defaultGallery.addItem(
      new Card(card, '#galleryItem', () => {
        popupWithImage.open(card.name, card.link);
      }).generateCard(card.likes.length)
    )
  }
}, '.gallery');

/*async function renderGallery() {
  try {
    const cards = await api.getCards();
    defaultGallery.setItems(cards);
    defaultGallery.renderItems();
    return defaultGallery; 
  }
  catch(error) { console.log(`Ошибка: ${error}`) }
}

renderGallery();*/

const renderGallery = new Promise(function(resolve, reject) {
  resolve(api.getCards());
  reject(error);
})
renderGallery
  .then(value => {
    defaultGallery.setItems(value);
    defaultGallery.renderItems();
    return defaultGallery;
  })
  .catch(error => {console.log(error)})


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
  const card = new Promise((resolve, reject) => {
    resolve(api.addCard(item));
    reject(error);
  })
  card
    .then((value) => {
      defaultGallery.setItems(value);
      defaultGallery.renderItems();
      return defaultGallery;
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
  api.editProfile(item).then(res => {
    userInfo.setUserInfo(res.name, res.about);
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
