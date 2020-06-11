'use strict';

var TITLE = ['Название объекта'];
var TYPE_OF_HOUSING = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var Prise = {
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
var PIN_SIZE = {
  x: 50,
  y: 70
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
        price: getRandomNumber(Prise.MIN, Prise.MAX),
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

var element = document.querySelector('.map');
element.classList.remove('map--faded');

/**
 * создание метки на основе template
 * @param {object} item - элемент
 * @return {element} - элемент
 */
var createMark = function (item) {
  var markTemplate = document.querySelector('#pin')
  .content.querySelector('.map__pin');
  var mark = markTemplate.cloneNode(true);
  mark.style.left = item.location.x + PIN_SIZE.x / 2 + 'px';
  mark.style.top = item.location.y - PIN_SIZE.y + 'px';
  var img = mark.querySelector('img');
  img.src = item.author.avatar;
  img.alt = item.offer.title;
  return mark;
};

/**
 * генерация меток на основе созданного массива объявлений
 * @param {object} dataAds - объект
 * @return {object} объект
 */
var generateMarks = function (dataAds) {
  var marksFragment = document.createDocumentFragment();
  dataAds.forEach(function (dataAd) {
    marksFragment.appendChild(createMark(dataAd));
  });
  return marksFragment;
};

var marksMap = element.querySelector('.map__pins');
var dataAds = createAds(COUNT_ADS);
marksMap.appendChild(generateMarks(dataAds));
