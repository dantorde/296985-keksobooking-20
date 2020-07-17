'use strict';

(function () {
  var MAX_AMAUNT_ADS = 5;

  var marksMap = document.querySelector('.map__pins');

  var removeMarks = function () {
    var marks = marksMap.querySelectorAll('button[type="button"]');
    marks.forEach(function (item) {
      item.remove();
    });
  };

  /**
  * генерация меток на основе созданного массива объявлений
  * @param {array} array - массив объктов
  * @return {object} объект
  */
  var generateMarks = function (array) {
    var marksFragment = document.createDocumentFragment();
    array.forEach(function (el) {
      marksFragment.appendChild(window.mark.create(el));
    });
    return marksMap.appendChild(marksFragment);
  };

  /**
   * полученние данных с сервера
   * @param {Array} data - данные с сервера
   */
  var renderAds = function (data) {
    var filterForm = document.querySelector('.map__filters');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');
    fieldsetFilterFormArr.forEach(function (fieldsetItem) {
      fieldsetItem.removeAttribute('disabled', 'disabled');
    });
    var ads = window.util.sliceArray(data, MAX_AMAUNT_ADS);
    generateMarks(ads);
  };

  window.map = {
    renderAds: renderAds,
    removeMarks: removeMarks
  };
})();
