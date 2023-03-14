//глобальные переменные
const page = document.querySelector('.page');

const templateGallery = page.querySelector('#galleryItem');
const gallerySection = page.querySelector('.gallery-section');
const galleryUl = page.querySelector('.gallery');

const buttonAdd = page.querySelector('.button_action_add');
const buttonEdit = page.querySelector('.button_action_edit');

const popupTemplate = page.querySelector('.popup');
const popupEditProfile = page.querySelector('.popup_edit-profile');
const popupAddCard = page.querySelector('.popup_add-card');
const popupImage = page.querySelector('.popup_image');

const fullname = page.querySelector('.profile__fullname');
const position = page.querySelector('.profile__position');

const imagePopup = popupImage.querySelector('.popup__image');
const imageDescPopup = page.querySelector('.popup__desc');

const formEditProfile = page.querySelector('#formEditProfile');
const inputName = page.querySelector('#formName');
const inputPosition = page.querySelector('#formPosition');
const formAddCard = page.querySelector('#formAddCard');
const inputPlaceName = page.querySelector('#placeName');
const inputPlaceUrl = page.querySelector('#placeUrl');

  function createCard(image){
    const templateGalleryItem = templateGallery.content.cloneNode(true);
    const galleryPic = templateGalleryItem.querySelector('.gallery__pic');
    galleryPic.src = image.link;
    galleryPic.alt = image.name;
    const galleryTitle = templateGalleryItem.querySelector('.gallery__title');
    galleryTitle.textContent = image.name;

    //лайки
    const heart = templateGalleryItem.querySelector('.heart');
    heart.addEventListener('click', () => heart.classList.toggle('heart_status_active'));

    //удаление картинок
    const buttonDelete = templateGalleryItem.querySelector('.gallery__delete');
    buttonDelete.addEventListener('click', (evt) => {
      evt.target.closest('.gallery__item').remove();
    })

    //просмотр картинок
    galleryPic.addEventListener('click', () => {
      openPopup(popupImage);
      loadImgPopup(galleryPic);
    })

    return templateGalleryItem.querySelector('.gallery__item');
  }

//функция загрузки картинок на страницу
  function loadGallery() {
    initialCards.forEach((image) => {
      const galleryItem = createCard(image);
      galleryUl.prepend(galleryItem);
    });
  }

//функция загрузки картинки и описания в попап
  function loadImgPopup(img) {
    imagePopup.src = img.src;
    imagePopup.alt = img.alt;
    imageDescPopup.textContent = img.alt;
  }

  //функция отправки формы изменения данных профиля
  function handleFormSubmit() {
    fullname.textContent = inputName.value;
    position.textContent = inputPosition.value;
    closePopup(popupEditProfile);
  }

//функцмя открытия попапа
  function openPopup(popupTemplate) {
    popupTemplate.classList.toggle('popup_opened');
  }

//функция закрытия попапа
  function closePopup(popupTemplate) {
    popupTemplate.classList.remove('popup_opened');
}

//функция открытия профиля
  function openEditProfilePopup() {
    openPopup(popupEditProfile);
    inputName.value = fullname.textContent;
    inputPosition.value = position.textContent;
  }

  //функция добавления картинок
  function uploadPicture() {
    const newImage = {name: inputPlaceName.value, link: inputPlaceUrl.value};
    galleryUl.prepend(createCard(newImage));
    closePopup(popupAddCard);
  }

//функция открытия добавления картинок
  function openAddCardPopup() {
    inputPlaceName.value = '';
    inputPlaceUrl.value = '';
    openPopup(popupAddCard);
  }

//слушаем кнопки
buttonEdit.addEventListener('click', () => openEditProfilePopup());
buttonAdd.addEventListener('click', () => openAddCardPopup());

formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  uploadPicture();
})

formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormSubmit();
})

//слушание кнопок закрытия
const buttonCloseEditProfile = popupEditProfile.querySelector('.button_action_close');
buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

const buttonCloseAddCard = popupAddCard.querySelector('.button_action_close');
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddCard));

const buttonCloseImage = popupImage.querySelector('.button_action_close');
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

//загрузка картинок на страницу
loadGallery();



