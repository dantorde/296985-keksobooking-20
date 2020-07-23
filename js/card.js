'use strict';

(function () {
  /**
   * получение фото из массива для карточки
   * @param {object} dataOffer - элемент массива объявлений
   * @return {element} - элементы
   */
  var getPhotos = function (dataOffer) {
    var cardEl = document.querySelector('#card')
      .content.querySelector('.map__card');
    var photoContainer = cardEl.querySelector('.popup__photos');
    var photoArrayr = dataOffer.offer.photos;
    var photoFragment = document.createDocumentFragment();
    photoArrayr.forEach(function (photoArray) {
      var photo = photoContainer.querySelector('.popup__photo').cloneNode(true);
      photo.src = photoArray;
      photoFragment.appendChild(photo);
    });
    return photoFragment;
  };

  /**
   * сравнение массивов на совпадения
   * @param {object} dataOffer - элемент массива объявлений
   * @return {element} featureFragment - элементы
   */
  var getFeatures = function (dataOffer) {
    var featuresArr = dataOffer.offer.features;
    var featureFragment = document.createDocumentFragment();
    featuresArr.forEach(function (feature) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + feature);
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  /**
   * генерация карточки на основе созданного массива объявлений
   * @param {object} dataOffer - элемент массива объявлений
   * @return {object} card - объект
   */
  var createCard = function (dataOffer) {
    var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = dataOffer.title;
    card.querySelector('.popup__text--address').textContent = dataOffer.offer.address;
    card.querySelector('.popup__text--price').textContent = dataOffer.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = dataOffer.offer.type;
    card.querySelector('.popup__text--capacity').textContent = dataOffer.offer.rooms + ' комнаты для ' + dataOffer.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataOffer.offer.checkin + ', выезд до ' + dataOffer.offer.checkout;
    card.querySelector('.popup__description').textContent = dataOffer.offer.description;
    card.querySelector('.popup__avatar').src = dataOffer.author.avatar;
    var popupPhoto = card.querySelector('.popup__photos');
    popupPhoto.innerHTML = '';
    popupPhoto.appendChild(getPhotos(dataOffer));
    var popFeatures = card.querySelector('.popup__features');
    popFeatures.innerHTML = '';
    popFeatures.appendChild(getFeatures(dataOffer));
    return card;
  };

  /**
  * удаление со страницы открытой карточки объявления
  */
  var clearCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  };


  window.card = {
    create: createCard,
    clear: clearCard
  };
})();
