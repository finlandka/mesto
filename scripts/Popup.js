export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._buttonClosePopup = this._selector.querySelector(
      ".button_action_close"
    );
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._selector.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._selector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClosePopup.addEventListener(
      "click",
      () => {
        this.close();
      },
      { once: true }
    );
    this._selector.addEventListener(
      "click",
      (evt) => {
        if (evt.target === this._selector) {
          this.close();
        }
      }
    );
  }
}
