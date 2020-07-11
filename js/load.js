'use strict';

(function () {

  var dataAds = [];

  var removePins = function () {
    var marksMap = document.querySelector('.map__pins');
    var marks = marksMap.querySelectorAll('button[type="button"]');
    marks.forEach(function (item) {
      item.remove();
    });
  };

  var housingType = document.querySelector('#housing-type');
  housingType.addEventListener('change', function () {
    removePins();
    filterHousing(dataAds);
  });

  /**
   * фильтрация пинов с последующей отрисовкой на странице пользователя
   * @param {Array} array - массив объектов
   */
  var filterHousing = function (array) {
    if (housingType.value === 'any') {
      var sameHousingTypeOffers = array;
    } else {
      sameHousingTypeOffers = array.filter(function (el) {
        return el.offer.type === housingType.value;
      });
    }
    window.map.generateMarks(sameHousingTypeOffers);
  };

  /**
   * полученние данных с сервера
   * @param {Array} data - данные с сервера
   */
  var loadAds = function (data) {
    dataAds = data;
    window.map.generateMarks(dataAds);
  };

  window.load = {
    ads: loadAds,
    filterHousing: filterHousing
  };

})();
