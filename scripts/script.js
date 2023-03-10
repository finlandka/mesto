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
const formName = page.querySelector('#name');
const formPosition = page.querySelector('#position');

const lightbox = page.querySelector('.lightbox');

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

//функция загрузки картинок на страницу
function loadGallery() {
  initialCards.forEach((image) => {
    const templateGalleryItem = templateGallery.content.cloneNode(true);
    const galleryPic = templateGalleryItem.querySelector('.gallery__pic');
    galleryPic.src = image.link;
    galleryPic.alt = image.name;
    const galleryTitle = templateGalleryItem.querySelector('.gallery__title');
    galleryTitle.textContent = image.name;
    const galleryItem = templateGalleryItem.querySelector('.gallery__item');
    galleryUl.prepend(galleryItem);
  });

  //добавление и удаление лайков
  const buttonsHeart = page.querySelectorAll('.heart');
  for (let item of buttonsHeart) {
    item.addEventListener('click', () => item.classList.toggle('heart_status_active'));
  }

  //удаление картинки со страницы и из массива
  const buttonsDelete = page.querySelectorAll('.gallery__delete');
  for (let item of buttonsDelete) {
    item.addEventListener('click', () => {
      initialCards = initialCards.filter((card) => {return card.name !== item.nextElementSibling.alt});
      galleryUl.innerHTML = '';
      loadGallery();
    });
  }

  //работа лайтбокса
  const galleryPics = page.querySelectorAll('.gallery__pic');
  const lightboxTitle = page.querySelector('.lightbox__title');
  for (let item of galleryPics) {
    item.addEventListener('click', () => {
      lightbox.classList.toggle('lightbox_opened');
      const lightboxImage = page.querySelector('.lightbox__image');
      lightboxImage.src = item.src;
      lightboxImage.alt = item.alt;
      lightboxTitle.textContent = item.alt;
    })
  }

  //закрытие лайтбокса
  const buttonCloseLigtbox = lightbox.querySelector('.button_action_close');
  buttonCloseLigtbox.addEventListener('click', closeLightbox);

}

//функция закрытия лайтбокса
function closeLightbox() {
  lightbox.classList.remove('lightbox_opened');
}

//функция открытия попапа и вставки содержимого в зависимости от кнопки
function openPopup(popupElement, head, button) {
  page.querySelector('.popup__title')?.remove();
  page.querySelector('.form')?.remove();
  popup.classList.toggle('popup_opened');
  const template = page.querySelector('#templateForm').content;
  const templateForm = template.cloneNode(true);
  templateForm.querySelector('.popup__title').textContent = head;
  templateForm.querySelector('.form__button').textContent = button;
  popupContainer.append(templateForm);
  const form = page.querySelector('.form');
  const formInput = page.querySelectorAll('.form__input');

  if (popupElement === 'edit') {
    formInput[0].value = fullname.textContent;
    formInput[0].setAttribute('id', 'name');
    formInput[1].value = position.textContent;
    formInput[1].setAttribute('id', 'position');

    form.addEventListener('submit', handleFormSubmit);
  }

  if (popupElement === 'add') {
    formInput[0].placeholder = 'Название';
    formInput[0].setAttribute('id', 'namePlace');
    formInput[1].placeholder = 'Ссылка на картинку';
    formInput[1].setAttribute('id', 'linkImage');

    form.addEventListener('submit', uploadPicture);
  }

  //функция отправки формы изменения данных профиля
  function handleFormSubmit (evt) {
    evt.preventDefault();
    fullname.textContent = formInput[0].value;
    position.textContent = formInput[1].value;
    closePopup();
  }

  //функция добавления картинок в массив и на страницу
  function uploadPicture (evt) {
    evt.preventDefault();
    initialCards.push({name: formInput[0].value, link: formInput[1].value});
    galleryUl.innerHTML = '';
    loadGallery();
    closePopup();
  }

  //закрытие попапа
  const buttonClosePopup = popup.querySelector('.button_action_close');
  buttonClosePopup.addEventListener('click', closePopup);

}

//функция закрытия попапа
function closePopup() {
  popup.classList.remove('popup_opened');
}

//загрузка картинок на страницу
loadGallery();

//кнопки добавления и редактирования
buttonAdd.addEventListener('click', () => openPopup('add', 'Новое место', 'Создать'));
buttonEdit.addEventListener('click', () => openPopup('edit', 'Редактировать профиль', 'Сохранить'));


