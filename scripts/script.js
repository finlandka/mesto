//глобальные переменные
const page = document.querySelector('.page');

const templateGallery = page.querySelector('#galleryItem');
const gallerySection = page.querySelector('.gallery-section');
const galleryUl = page.querySelector('.gallery');

const buttonAdd = page.querySelector('.button_action_add');
const buttonEdit = page.querySelector('.button_action_edit');

const popup = page.querySelector('.popup');
const popupContainer = page.querySelector('.popup__container');

const fullname = page.querySelector('.profile__fullname');
const position = page.querySelector('.profile__position');

const popupProfileEdit = page.querySelector('.popup_edit-profile');
const popupCardAdd = page.querySelector('.popup_add-card');
const popupImage = page.querySelector('.popup_image');

const slideImage = popupImage.querySelector('.popup__image');
const slideImageDesc = page.querySelector('.popup__desc');

const formInput = popupProfileEdit.querySelectorAll('.form__input');
const buttonInput = popupProfileEdit.querySelector('.form__button');
const formAdd = popupCardAdd.querySelectorAll('.form__input');
const buttonInputAdd = popupCardAdd.querySelector('.form__button');

//массив с картинками
let initialCards = [
  {
    name: 'Байкал',
    link: 'images/gallery-baikal.jpg'
  },
  {
    name: 'Камчатка',
    link: 'images/gallery-kamchatka.jpg'
  },
  {
    name: 'Кижи',
    link: 'images/gallery-kiji.jpg'
  },
  {
    name: 'Онежское озеро',
    link: 'images/gallery-lake-onejskoe.jpg'
  },
  {
    name: 'Рыбачий полуостров',
    link: 'images/gallery-pov-rybaci.jpg'
  },
  {
    name: 'Сочи',
    link: 'images/gallery-sochi.jpg'
  }
];

  //функция добавления картинок в массив
  function uploadPicture (form) {
    initialCards.push({name: form[0].value, link: form[1].value});
    const newImage = {name: form[0].value, link: form[1].value};
    galleryUl.prepend(createCard(newImage));
    closePopup(popupCardAdd);
  }

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
    buttonDelete.addEventListener('click', () => {
      initialCards = initialCards.filter((card) => {return card.name !== buttonDelete.nextElementSibling.alt});
      buttonDelete.parentNode.remove();
    });

    //просмотр картинок
    galleryPic.addEventListener('click', () => {
      openPopup(popupImage);
      loadImg(galleryPic);
    })

    return templateGalleryItem.querySelector('.gallery__item');
}

//функция загрузки картинок на страницу и действий с ними
function loadGallery() {
  initialCards.forEach((image) => {
    const galleryItem = createCard(image);
    galleryUl.prepend(galleryItem);
  });
}

//функция загрузки картинки и описания в попап
function loadImg(img) {
  slideImage.src = img.src;
  slideImage.alt = img.alt;
  slideImageDesc.textContent = img.alt;
}

  //функция отправки формы изменения данных профиля
  function handleFormSubmit (form) {
    fullname.textContent = form[0].value;
    position.textContent = form[1].value;
    closePopup(popupProfileEdit);
  }

//функцмя открытия попапа
function openPopup(popup) {
  popup.classList.toggle('popup_opened');
  if (popup.classList.contains('popup_edit-profile')) {
    formInput[0].value = fullname.textContent;
    formInput[1].value = position.textContent;
    buttonInput.addEventListener('click', (evt) => {
      evt.preventDefault();
      handleFormSubmit(formInput);
    })
  }

  if (popup.classList.contains('popup_add-card')) {
    buttonInputAdd.addEventListener('click', (evt) => {
      evt.preventDefault();
      uploadPicture(formAdd);
    });
  }
}

//слушаем кнопки
buttonEdit.addEventListener('click', () => openPopup(popupProfileEdit));
buttonAdd.addEventListener('click', () => openPopup(popupCardAdd));

//функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//слушание кнопок закрытия
const buttonCloseEdit = popupProfileEdit.querySelector('.button_action_close');
buttonCloseEdit.addEventListener('click', () => closePopup(popupProfileEdit));

const buttonCloseAdd = popupCardAdd.querySelector('.button_action_close');
buttonCloseAdd.addEventListener('click', () => closePopup(popupCardAdd));

const buttonCloseImage = popupImage.querySelector('.button_action_close');
buttonCloseImage.addEventListener('click', () => closePopup(popupImage));

//загрузка картинок на страницу
loadGallery();



