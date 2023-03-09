const page = document.querySelector('.page');

const gallerySection = page.querySelector('.gallery-section');

const addButton = page.querySelector('.button_action_add');
const editButton = page.querySelector('.button_action_edit');
const closeButton = page.querySelector('.button_action_close');

const popup = page.querySelector('.popup');
const popupContainer = page.querySelector('.popup__container');

const fullname = page.querySelector('.profile__fullname');
const position = page.querySelector('.profile__position');
const formName = page.querySelector('#name');
const formPosition = page.querySelector('#position');

const add = 'add';
const edit = 'edit';

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://finlandka.github.io/mesto/images/gallery-baikal.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://finlandka.github.io/mesto/images/gallery-kamchatka.jpg'
  },
  {
    name: 'Кижи',
    link: 'https://finlandka.github.io/mesto/images/gallery-kiji.jpg'
  },
  {
    name: 'Онежское озеро',
    link: 'https://finlandka.github.io/mesto/images/gallery-lake-onejskoe.jpg'
  },
  {
    name: 'Рыбачий полуостров',
    link: 'https://finlandka.github.io/mesto/images/gallery-pov-rybaci.jpg'
  },
  {
    name: 'Сочи',
    link: 'https://finlandka.github.io/mesto/images/gallery-sochi.jpg'
  }
];

function loadGallery() {
  const galleryUl = document.createElement('ul');
  galleryUl.classList.add('gallery');
  gallerySection.append(galleryUl);

  initialCards.forEach((image) => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    galleryItem.innerHTML = `
                            <img class="gallery__pic" src="${image.link}" alt="${image.name}">
                            <div class="gallery__desc">
                              <h2 class="gallery__title">${image.name}</h2>
                              <button class="button heart"></button>
                            </div>
    `;
    galleryUl.prepend(galleryItem);
  })
}

function openPopup(popupElement, head, button) {
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

  function handleFormSubmit (evt) {
    evt.preventDefault();
    fullname.textContent = formInput[0].value;
    position.textContent = formInput[1].value;
    close();
  }

  function uploadPicture (evt) {
    evt.preventDefault();
    initialCards.push({name: formInput[0].value, link: formInput[1].value});
    page.querySelector('.gallery').remove();
    loadGallery();
    close();
  }
}

function close() {
  popup.classList.remove('popup_opened');
  page.querySelector('.popup__title').remove();
  page.querySelector('.form').remove();
}

loadGallery();

addButton.addEventListener('click', () => openPopup(add, 'Новое место', 'Создать'));
editButton.addEventListener('click', () => openPopup(edit, 'Редактировать профиль', 'Сохранить'));
closeButton.addEventListener('click', close);


