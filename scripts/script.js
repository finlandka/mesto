//глобальные переменные
const page = document.querySelector(".page");

const templateGallery = page.querySelector("#galleryItem");
const gallerySection = page.querySelector(".gallery-section");
const galleryUl = page.querySelector(".gallery");

const buttonOpenAddCardPopup = page.querySelector(".button_action_add");
const buttonOpenEditProfilePopup = page.querySelector(".button_action_edit");

const popupEditProfile = page.querySelector(".popup_edit-profile");
const popupAddCard = page.querySelector(".popup_add-card");
const buttonClosePopupAddCard = popupAddCard.querySelector(".popup__button");
const buttonClosePopupEditProfile =
  popupEditProfile.querySelector(".popup__button");
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

function loadDataPopupEditProfile() {
  inputName.value = fullname.textContent;
  inputPosition.value = position.textContent;
}

loadDataPopupEditProfile();

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

//функцмя открытия попапа
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
  checkInputValueEmpty(popupEditProfile, buttonClosePopupEditProfile);
  deleteErrors(popupEditProfile);
  openPopup(popupEditProfile);
}

//функция добавления картинок
function uploadPicture() {
  const newImage = { name: inputPlaceName.value, link: inputPlaceUrl.value };
  galleryUl.prepend(createCard(newImage));
  closePopup(popupAddCard);
}
//функция проверки инпутов на пустоту
function checkInputValueEmpty(popupTemplate, buttonClosePopap) {
  const inputList = Array.from(
    popupTemplate.querySelectorAll(optionsClasses.inputSelector)
  );
  inputList.forEach((input) => {
    if (!input.value) {
      buttonClosePopap.classList.add(optionsClasses.inactiveButtonClass);
      buttonClosePopap.disabled = true;
    } else {
      buttonClosePopap.classList.remove(optionsClasses.inactiveButtonClass);
      buttonClosePopap.disabled = false;
    }
  });
}
//функция очистки ошибок валидации в верстке
function deleteErrors(popupTemplate) {
  const inputList = Array.from(
    popupTemplate.querySelectorAll(optionsClasses.inputSelector)
  );
  inputList.forEach((input) => {
    input.classList.remove(optionsClasses.inputErrorClass);
    input.nextElementSibling.classList.remove(optionsClasses.errorClass);
  });
}

//функция открытия добавления картинок
function openAddCardPopup() {
  formAddCard.reset();
  checkInputValueEmpty(popupAddCard, buttonClosePopupAddCard);
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

//загрузка картинок на страницу
loadGallery();
