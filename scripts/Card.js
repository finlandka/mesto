
class Card {
  constructor(data) {
    this._name = data.name;
    this._link = data.link;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector(".heart");
    this._buttonDelete = this._element.querySelector(".gallery__delete");
    this._popupImage = document.querySelector(".popup_image");
    this._galleryPic = this._element.querySelector(".gallery__pic");
    this._buttonClose = this._popupImage.querySelector(".button_action_close");
    this._imageInPopup = this._popupImage.querySelector('.popup__image');
    this._imageDescPopup = this._popupImage.querySelector('.popup__desc');
  }

  _getTemplate() {
    const templateGalleryItem = document
    .querySelector("#galleryItem")
    .content
    .querySelector(".gallery__item")
    .cloneNode(true);

    return templateGalleryItem;
  }

  generateCard() {
    this._setEventListeners();
    this._galleryPic.src = this._link;
    this._galleryPic.alt = this._name;
    const galleryTitle = this._element.querySelector(".gallery__title");
    galleryTitle.textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._heart.addEventListener('click', () => {
      this._toggleLike();
    })

    this._buttonDelete.addEventListener("click", () => {
      this._deleteImage();
    })

    this._galleryPic.addEventListener('click', () => {
      this._handleOpenPopup();
    })

    this._buttonClose.addEventListener('click', () => {
      this._handleClosePopup();
    })

    this._popupImage.addEventListener('click', () => {
      this._handleClosePopup();
    })
  }

  _toggleLike() {
    this._heart.classList.toggle("heart_status_active");
  }

  _deleteImage() {
    this._buttonDelete.closest(".gallery__item").remove();
  }

  _handleOpenPopup() {
    this._popupImage.classList.add("popup_opened");
    this._loadImgPopup();
  }

  _handleClosePopup() {
    this._popupImage.classList.remove("popup_opened");
  }

  _loadImgPopup() {
    this._imageInPopup.src = this._link;
    this._imageInPopup.alt = this._name;
    this._imageDescPopup.textContent = this._name;
  }
  
}

export { Card };
