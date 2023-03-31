//глобальные переменные
const page = document.querySelector(".page");

const templateGallery = page.querySelector("#galleryItem");
const gallerySection = page.querySelector(".gallery-section");
const galleryUl = page.querySelector(".gallery");

const buttonOpenAddCardPopup = page.querySelector(".button_action_add");
const buttonOpenEditProfilePopup = page.querySelector(".button_action_edit");

const popupEditProfile = page.querySelector(".popup_edit-profile");
const popupAddCard = page.querySelector(".popup_add-card");
const popupImage = page.querySelector(".popup_image");

const fullname = page.querySelector(".profile__fullname");
const position = page.querySelector(".profile__position");

const imagePopup = popupImage.querySelector(".popup__image");
const imageDescPopup = page.querySelector(".popup__desc");

const formEditProfile = page.querySelector("#formEditProfile");
const inputName = page.querySelector("#formName");
const inputPosition = page.querySelector("#formPosition");
const formAddCard = page.querySelector("#formAddCard");
const inputPlaceName = page.querySelector("#placeName");
const inputPlaceUrl = page.querySelector("#placeUrl");

inputName.value = fullname.textContent;
inputPosition.value = position.textContent;

function createCard(image) {
  const templateGalleryItem = templateGallery.content.cloneNode(true);
  const galleryPic = templateGalleryItem.querySelector(".gallery__pic");
  galleryPic.src = image.link;
  galleryPic.alt = image.name;
  const galleryTitle = templateGalleryItem.querySelector(".gallery__title");
  galleryTitle.textContent = image.name;

  //лайки
  const heart = templateGalleryItem.querySelector(".heart");
  heart.addEventListener("click", () =>
    heart.classList.toggle("heart_status_active")
  );

  //удаление картинок
  const buttonDelete = templateGalleryItem.querySelector(".gallery__delete");
  buttonDelete.addEventListener("click", (evt) => {
    evt.target.closest(".gallery__item").remove();
  });

  //просмотр картинок
  galleryPic.addEventListener("click", () => {
    openPopup(popupImage);
    loadImgPopup(galleryPic);
  });

  return templateGalleryItem.querySelector(".gallery__item");
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
function submitEditProfileForm() {
  fullname.textContent = inputName.value;
  position.textContent = inputPosition.value;
  closePopup(popupEditProfile);
}

function pressEsc (evt, popupTemplate) {
  if (evt.key === 'Escape') {
    closePopup(popupTemplate);
  }
}

function clickOverlay (evt, popupTemplate) {
  if (evt.target === popupTemplate) {
    closePopup(popupTemplate)
  }
}

function toggleEventListener(element, eventType, callback, isAdd) {
  if (isAdd) {
    element.addEventListener(eventType, callback);
  } else {
    element.removeEventListener(eventType, callback);
  }
}

//функцмя открытия попапа
function openPopup(popupTemplate) {
  popupTemplate.classList.toggle("popup_opened");

//  вешаем слушатель нажатия кнопки на документ
  toggleEventListener(document, 'keydown', (evt) => {pressEsc(evt, popupTemplate)}, true);
//вешаем слушатель клика на оверлэй
  toggleEventListener(popupTemplate, 'click', (evt) => {clickOverlay(evt, popupTemplate)}, true);
//вешаем слушателя клика на крестик
  const buttonClosePopup = popupTemplate.querySelector(".button_action_close");
  toggleEventListener(buttonClosePopup, 'click', () =>  closePopup(popupTemplate), true);
}

//функция закрытия попапа
function closePopup(popupTemplate) {
  popupTemplate.classList.remove("popup_opened");

  toggleEventListener(document, 'keydown', (evt) => {pressEsc(evt, popupTemplate)}, false);

  toggleEventListener(popupTemplate, 'click', (evt) => {clickOverlay(evt, popupTemplate)}, false);

  const buttonClosePopup = popupTemplate.querySelector(".button_action_close");
  toggleEventListener(buttonClosePopup, 'click', () =>  closePopup(popupTemplate), false);
}

//функция открытия профиля
function openEditProfilePopup() {
  openPopup(popupEditProfile);
}

//функция добавления картинок
function uploadPicture() {
  const newImage = { name: inputPlaceName.value, link: inputPlaceUrl.value };
  galleryUl.prepend(createCard(newImage));
  closePopup(popupAddCard);
}

//функция открытия добавления картинок
function openAddCardPopup() {
  formAddCard.reset();
  openPopup(popupAddCard);
}

//слушаем кнопки
toggleEventListener(buttonOpenEditProfilePopup, 'click', openEditProfilePopup, true);

toggleEventListener(buttonOpenAddCardPopup, 'click', openAddCardPopup, true);


toggleEventListener(formAddCard, 'submit', (evt) => {
  evt.preventDefault();
  uploadPicture();
}, true);

toggleEventListener(formEditProfile, 'submit', (evt) => {
  evt.preventDefault();
  submitEditProfileForm();
}, true);

//загрузка картинок на страницу
loadGallery();
