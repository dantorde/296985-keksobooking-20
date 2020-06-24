'use strict';
(function () {
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
      var xLocation = getRandomNumber(LocationAd.MIN_X, LocationAd.MAX_X);
      var yLocation = getRandomNumber(LocationAd.MIN_Y, LocationAd.MAX_Y);
      ad[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: TITLE,
          address: xLocation + ',' + yLocation,
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
          x: xLocation,
          y: yLocation
        }
      };
    }
    return ad;
  };
  window.data = {
    createAds: createAds
  };
}) ();
