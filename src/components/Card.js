export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick, cardObject) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._element = this._getTemplate();
    this._heart = this._element.querySelector(".heart");
    this._buttonDelete = this._element.querySelector(".gallery__delete");
    this._popupImage = document.querySelector(".popup_image");
    this._galleryPic = this._element.querySelector(".gallery__pic");
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = cardObject.owner._id;
    this._cardId = cardObject._id;
    this._arrayLikes = cardObject.likes;
  }

  _getTemplate() {
    const templateGalleryItem = document
      .querySelector(this._templateSelector)
      .content.querySelector(".gallery__item")
      .cloneNode(true);

    return templateGalleryItem;
  }

  generateCard(count) {
    this._setEventListeners();
    this._galleryPic.src = this._link;
    this._galleryPic.alt = this._name;
    const galleryTitle = this._element.querySelector(".gallery__title");
    const galleryDelete = this._element.querySelector(".gallery__delete");
    const likeCount = this._element.querySelector(".gallery__count");
    galleryTitle.textContent = this._name;
    likeCount.textContent = count;
    if(this._userId != '2526a40455e1d05c005a8c65') {
      galleryDelete.remove();
    }
    this._arrayLikes.forEach(like => {
      if(like._id === '2526a40455e1d05c005a8c65') {
        this._toggleLike();
      }
    })

    return this._element;
  }

  _setEventListeners() {
    this._heart.addEventListener("click", () => {
      this._toggleLike();
      if(this._heart.classList.contains('heart_status_active')) {
        this._handleLikeClick(this._cardId, true);
      } else {
        this._handleLikeClick(this._cardId, false)
      }
    });

    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick();
      //this._deleteImage();
    });

    this._galleryPic.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _toggleLike() {
    this._heart.classList.toggle("heart_status_active");
  }

  /*_deleteImage() {
    this._element.remove();
  }*/
}
