
export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector(".heart");
    this._buttonDelete = this._element.querySelector(".gallery__delete");
    this._popupImage = document.querySelector(".popup_image");
    this._galleryPic = this._element.querySelector(".gallery__pic");
    this._handleCardClick = handleCardClick;
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
      this._handleCardClick();
    });

  }

  _toggleLike() {
    this._heart.classList.toggle("heart_status_active");
  }

  _deleteImage() {
    this._buttonDelete.closest(".gallery__item").remove();
  }

}
