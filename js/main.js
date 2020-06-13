'use strict';

var TITLE = ['Название объекта'];
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var Price = {
  MIN: 1000,
  MAX: 1000000
};
var Room = {
  MIN: 1,
  MAX: 6
};
var Guest = {
  MIN: 1,
  MAX: 8
};
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание'];
var LocationAd = {
  MIN_X: 0,
  MAX_X: 1200,
  MIN_Y: 130,
  MAX_Y: 630,
};
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var COUNT_ADS = 8;
var PinSize = {
  X: 50,
  Y: 70
};

/**
 * генерация случайного числа из диапозона
 * @param {number} min - минимальное число
 * @param {number} max - максимальное число
 * @return {number} - случайное число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * генерация случайного элемента массива
 * @param {array} array - массив
 * @return {string} - случайный элемент массива
 */
var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * перемешивание элементов массива в случайном порядке
 * @param {array} arr - массив
 * @return {array} - массив
 */
var shuffleArr = function (arr) {
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
};

/**
 * получение фото из массива для карточки
 * @param {array} arr - массив
 * @return {element} - элементы
 */
var getPhotos = function () {
  for (var i = 0; i < dataAds[0].offer.photos.length; i++) {
    var cardEl = document.querySelector('#card')
    .content.querySelector('.map__card');
    var photoContainer = cardEl.querySelector('.popup__photos');
    var photo = photoContainer.querySelector('.popup__photo').cloneNode(true);
    photo.src = dataAds[0].offer.photos[i];
    photoContainer.appendChild(photo);
  }
  return photoContainer;
};

/**
 * сравнение массивов на совпадения
 * @param {element} item - элемент
 */
var getFeatures = function (item) {
  var featuresArr = item.offer.features;
  for (var i = 0; i < FEATURES.length; i++) {
    if (featuresArr.includes(FEATURES[i])) {
    }
  }
};
/**
 * получение массива случайной длины из элементов другого массива
 * @param {array} arr - массив
 * @return {array} - массив
 */
var getRandomArray = function (arr) {
  var randomArr = shuffleArr(arr);
  var randomArrLenghth = getRandomNumber(1, randomArr.length);
  var randomItems = randomArr.slice(0, randomArrLenghth);
  return randomItems;
};

/**
 * генерация массива объявлений
 * @param {number} count - длина массива
 * @return {array} - массив
 */
var createAds = function (count) {
  var ad = [];
  for (var i = 0; i < count; i++) {
    ad[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE,
        address: location.x + ',' + location.y,
        price: getRandomNumber(Price.MIN, Price.MAX),
        type: getRandomValue(TYPE_OF_HOUSING),
        rooms: getRandomNumber(Room.MIN, Room.MAX),
        guests: getRandomNumber(Guest.MIN, Guest.MAX),
        checkin: getRandomValue(TIME),
        checkout: getRandomValue(TIME),
        features: getRandomArray(FEATURES),
        description: DESCRIPTION,
        photos: getRandomArray(PHOTOS)
      },
      location: {
        x: getRandomNumber(LocationAd.MIN_X, LocationAd.MAX_X),
        y: getRandomNumber(LocationAd.MIN_Y, LocationAd.MAX_Y)
      }
    };
  }
  return ad;
};

/**
 * создание метки на основе template
 * @param {object} item - элемент
 * @return {element} - элемент
 */
var createMark = function (item) {
  var markTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
  var mark = markTemplate.cloneNode(true);
  mark.style.left = item.location.x + PinSize.X / 2 + 'px';
  mark.style.top = item.location.y - PinSize.Y + 'px';
  var img = mark.querySelector('img');
  img.src = item.author.avatar;
  img.alt = item.offer.title;
  return mark;
};

/**
 * генерация меток на основе созданного массива объявлений
 * @param {array} dataAds - массив объктов
 * @return {object} объект
 */
var generateMarks = function (dataAds) {
  var marksFragment = document.createDocumentFragment();
  dataAds.forEach(function (dataAd) {
    marksFragment.appendChild(createMark(dataAd));
  });
  return marksFragment;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var marksMap = map.querySelector('.map__pins');
var dataAds = createAds(COUNT_ADS);
marksMap.appendChild(generateMarks(dataAds));

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
  popPhoto.appendChild(getPhotos(PHOTOS));
  //var popFeatures = card.querySelector('.popup__features');
  //popFeatures.appendChild(getFeatures(dataAds[0]));

  return card;
};

var CardFragment = document.createDocumentFragment();
CardFragment.appendChild(createCard(dataAds[0]));

var cardEFilters = map.querySelector('.map__filters-container');
map.insertBefore(CardFragment, cardEFilters);
