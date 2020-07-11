'use strict';

(function () {
  /**
   * получение фото из массива для карточки
   * @param {object} dataAd - элемент массива объявлений
   * @return {element} - элементы
   */
  var getPhotos = function (dataAd) {
    var cardEl = document.querySelector('#card')
      .content.querySelector('.map__card');
    var photoContainer = cardEl.querySelector('.popup__photos');
    var photoArr = dataAd.offer.photos;
    var photoFragment = document.createDocumentFragment();
    photoArr.forEach(function (photoAr) {
      var photo = photoContainer.querySelector('.popup__photo').cloneNode(true);
      photo.src = photoAr;
      photoFragment.appendChild(photo);
    });
    return photoFragment;
  };

  /**
   * сравнение массивов на совпадения
   * @param {object} dataAd - элемент массива объявлений
   * @return {element} featureFragment - элементы
   */
  var getFeatures = function (dataAd) {
    var featuresArr = dataAd.offer.features;
    var featureFragment = document.createDocumentFragment();
    featuresArr.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature', 'popup__feature--' + feature);
      featureFragment.appendChild(featureElement);
    });
    return featureFragment;
  };

  /**
   * генерация карточки на основе созданного массива объявлений
   * @param {object} dataAd - элемент массива объявлений
   * @return {object} card - объект
   */
  var createCard = function (dataAd) {
    var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = dataAd.title;
    card.querySelector('.popup__text--address').textContent = dataAd.offer.address;
    card.querySelector('.popup__text--price').textContent = dataAd.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = dataAd.offer.type;
    card.querySelector('.popup__text--capacity').textContent = dataAd.offer.rooms + ' комнаты для ' + dataAd.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataAd.offer.checkin + ', выезд до ' + dataAd.offer.checkout;
    card.querySelector('.popup__description').textContent = dataAd.offer.description;
    card.querySelector('.popup__avatar').src = dataAd.author.avatar;
    var popPhoto = card.querySelector('.popup__photos');
    popPhoto.innerHTML = '';
    popPhoto.appendChild(getPhotos(dataAd));
    var popFeatures = card.querySelector('.popup__features');
    popFeatures.innerHTML = '';
    popFeatures.appendChild(getFeatures(dataAd));
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
