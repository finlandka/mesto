import { openPopup, closePopup } from "./utils.js";

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector(".heart");
    this._buttonDelete = this._element.querySelector(".gallery__delete");
    this._popupImage = document.querySelector(".popup_image");
    this._galleryPic = this._element.querySelector(".gallery__pic");
    this._buttonClose = this._popupImage.querySelector(".button_action_close");
    this._imageInPopup = this._popupImage.querySelector(".popup__image");
    this._imageDescPopup = this._popupImage.querySelector(".popup__desc");
  }

  _getTemplate() {
    const templateGalleryItem = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
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
    this._heart.addEventListener("click", () => {
      this._toggleLike();
    });

    this._buttonDelete.addEventListener("click", () => {
      this._deleteImage();
    });

    this._galleryPic.addEventListener("click", () => {
      this._loadImgPopup();
      openPopup(this._popupImage);
    });

    this._buttonClose.addEventListener("click", () => {
      closePopup(this._popupImage);
    });
  }

  _toggleLike() {
    this._heart.classList.toggle("heart_status_active");
  }

  _deleteImage() {
    this._buttonDelete.closest(".gallery__item").remove();
  }

  _loadImgPopup() {
    this._imageInPopup.src = this._link;
    this._imageInPopup.alt = this._name;
    this._imageDescPopup.textContent = this._name;
  }
}

export { Card };
