const page = document.querySelector('.page');
const editButton = page.querySelector('.button_action_edit');
const closeButton = page.querySelector('.button_action_close');
const form = page.querySelector('.form');
const popup = page.querySelector('.popup');
const fullname = page.querySelector('.profile__fullname');
const position = page.querySelector('.profile__position');
const formName = page.querySelector('#name');
const formPosition = page.querySelector('#position');

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
  const gallerySection = page.querySelector('.gallery-section');
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
    galleryUl.append(galleryItem);
  })
}

loadGallery();

function openEditProfile() {
  popup.classList.add('popup_opened');
  formName.value = fullname.textContent;
  formPosition.value = position.textContent;
}

function closeEditProfile() {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  fullname.textContent = formName.value;
  position.textContent = formPosition.value;
  closeEditProfile();
}

editButton.addEventListener('click', openEditProfile);
closeButton.addEventListener('click', closeEditProfile);

form.addEventListener('submit', handleFormSubmit);
