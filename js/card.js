'use strict';

(function () {
  /**
   * получение фото из массива для карточки
   * @return {element} - элементы
   */
  var getPhotos = function () {
    var cardEl = document.querySelector('#card')
      .content.querySelector('.map__card');
    var photoContainer = cardEl.querySelector('.popup__photos');
    var photoArr = dataAds[0].offer.photos;
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
   * @return {element} featureFragment - элементы
   */
  var getFeatures = function () {
    var featuresArr = dataAds[0].offer.features;
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
   * @param {object} item - объект
   * @return {object} card - объект
   */
  var createCard = function (item) {
    var cardTemplate = document.querySelector('#card')
    .content.querySelector('.map__card');
    var card = cardTemplate.cloneNode(true);
    card.querySelector('.popup__title').textContent = item.title;
    card.querySelector('.popup__text--address').textContent = item.offer.address;
    card.querySelector('.popup__text--price').textContent = item.offer.price + ' ₽/ночь';
    card.querySelector('.popup__type').textContent = item.offer.type;
    card.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
    card.querySelector('.popup__description').textContent = item.offer.description;
    card.querySelector('.popup__avatar').src = item.author.avatar;
    var popPhoto = card.querySelector('.popup__photos');
    popPhoto.innerHTML = '';
    popPhoto.appendChild(getPhotos());
    var popFeatures = card.querySelector('.popup__features');
    popFeatures.innerHTML = '';
    popFeatures.appendChild(getFeatures());

    return card;
  };

  window.card = {
    create: createCard
  };
}) ();
