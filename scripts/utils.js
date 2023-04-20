//функция открытия попапа
function openPopup(popupTemplate) {
  popupTemplate.classList.add("popup_opened");
  //создаем новые функции с переданным popupTemplate
  const pressEscWrapper = (evt) => pressEsc(popupTemplate, evt);
  const clickOverlayWrapper = (evt) => clickOverlay(popupTemplate, evt);
  const closePopupWrapper = (evt) => closePopup(popupTemplate, evt);

  //  вешаем слушатель нажатия кнопки на документ
  toggleEventListener(document, "keydown", pressEscWrapper, true);
  //вешаем слушатель клика на оверлэй
  toggleEventListener(popupTemplate, "click", clickOverlayWrapper, true);

  //вешаем слушателя клика на крестик
  const buttonClosePopup = popupTemplate.querySelector(".button_action_close");
  toggleEventListener(buttonClosePopup, "click", closePopupWrapper, true);
}

//функция закрытия попапа
function closePopup(popupTemplate) {
  popupTemplate.classList.remove("popup_opened");

  const pressEscWrapper = (evt) => pressEsc(popupTemplate, evt);
  const clickOverlayWrapper = (evt) => clickOverlay(popupTemplate, evt);
  const closePopupWrapper = (evt) => closePopup(popupTemplate, evt);

  toggleEventListener(document, "keydown", pressEscWrapper, false);
  toggleEventListener(popupTemplate, "click", clickOverlayWrapper, false);

  const buttonClosePopup = popupTemplate.querySelector(".button_action_close");
  toggleEventListener(buttonClosePopup, "click", closePopupWrapper, false);
}

function pressEsc(popupTemplate, evt) {
  if (evt.key === "Escape") {
    closePopup(popupTemplate);
  }
}

function clickOverlay(popupTemplate, evt) {
  if (evt.target === popupTemplate) {
    closePopup(popupTemplate);
  }
}

function toggleEventListener(element, eventType, callback, isAdd) {
  if (isAdd) {
    element.addEventListener(eventType, callback);
  } else {
    element.removeEventListener(eventType, callback);
  }
}

export { openPopup, closePopup, toggleEventListener };
