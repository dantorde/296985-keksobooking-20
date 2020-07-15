
'use strict';

(function () {
  var MAX_AMAUNT_ADS = 5;
  var dataAds = [];

  var cropArray = function (array) {
    return array.slice(0, MAX_AMAUNT_ADS);
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
    ads: loadAds
  };

})();
