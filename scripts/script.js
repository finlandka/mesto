let page = document.querySelector('.page');
let editButton = page.querySelector('.button_action_edit');
let closeButton = page.querySelector('.button_action_close');
let form = page.querySelector('.form');
let popup = page.querySelector('.popup');
let fullname = page.querySelector('.profile__fullname');
let position = page.querySelector('.profile__position');
let formName = page.querySelector('#name');
let formPosition = page.querySelector('#position');

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
