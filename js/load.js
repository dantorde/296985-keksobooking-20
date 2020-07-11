'use strict';

(function () {
  var MAX_AMAUNT_ADS = 5;
  var dataAds = [];

  var cropArray = function (array) {
    return array.slice(0, MAX_AMAUNT_ADS);
  };

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
    window.card.clear();
    filterHousing(dataAds);
  });

  /**
   * фильтрация пинов с последующей отрисовкой на странице пользователя
   * @param {Array} array - массив объектов
   */
  var filterHousing = function (array) {
    if (housingType.value === 'any') {
      var sameHousingTypeOffers = cropArray(array);
    } else {
      var offers = array.filter(function (el) {
        return el.offer.type === housingType.value;
      });
      sameHousingTypeOffers = cropArray(offers);
    }
    window.map.generateMarks(sameHousingTypeOffers);
  };

  /**
   * полученние данных с сервера
   * @param {Array} data - данные с сервера
   */
  var loadAds = function (data) {
    dataAds = data;
    var filterForm = document.querySelector('.map__filters');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');
    fieldsetFilterFormArr.forEach(function (fieldsetItem) {
      fieldsetItem.removeAttribute('disabled', 'disabled');
    });
    var ads = cropArray(dataAds);
    window.map.generateMarks(ads);
  };

  window.load = {
    ads: loadAds,
    filterHousing: filterHousing
  };

})();
