'use strict';

var TITLE = ['Название объекта'];
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Описание'];
var MIN_Y = 130;
var MAX_Y = 630;
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var countObjects = 8;
var mapWidth = document.querySelector('.map').clientWidth;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getObjects = function () {
  var object = [];
  for (var i = 0; i < countObjects; i++) {
    object[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: TITLE,
        address: getRandomNumber(0, mapWidth) + ',' + getRandomNumber(MIN_Y, MAX_Y),
        price: getRandomNumber(1, 10000),
        type: getRandomValue(TYPE_OF_HOUSING),
        rooms: getRandomNumber(1, 6),
        guests: getRandomNumber(1, 10),
        checkin: getRandomValue(CHECKIN),
        checkout: getRandomValue(CHECKOUT),
        features: getRandomValue(FEATURES),
        description: DESCRIPTION,
        photos: getRandomValue(PHOTOS)
      },
      location: {
        x: getRandomNumber(0, mapWidth),
        y: getRandomNumber(MIN_Y, MAX_Y)
      }
    };
  }
  return object;
};

var element = document.querySelector('.map');
element.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');

var dataItemFragment = function (item) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = item.location.x + 25 + 'px';
  pin.style.top = item.location.y - 70 + 'px';
  var img = pin.querySelector('img');
  img.src = item.author.avatar;
  img.alt = item.offer.title;
  return pin;
};

var renderPins = function () {
  var result = document.createDocumentFragment();
  for (var i = 0; i < getObjects().length; i++) {
    result.appendChild(dataItemFragment(getObjects()[i]));
  }
  return result;
};

var pinContainerElem = element.querySelector('.map__pins');
pinContainerElem.appendChild(renderPins());
