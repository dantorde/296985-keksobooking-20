'use strict';

(function () {
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
    for (var i = 0; i < window.util.MAX_AMAUNT_ADS && typeof array[i] !== 'undefined'; i++) {
      var el = array[i];
      marksFragment.appendChild(window.mark.create(el));
    }
    return marksMap.appendChild(marksFragment);
  };

  /**
   * полученние данных с сервера
   * @param {Array} data - данные с сервера
   */
  var renderAds = function (data) {
    var filterForm = document.querySelector('.map__filters');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');
    var selectFilterFormArr = filterForm.querySelectorAll('select');
    fieldsetFilterFormArr.forEach(function (fieldsetItem) {
      fieldsetItem.removeAttribute('disabled', 'disabled');
    });
    selectFilterFormArr.forEach(function (selectItem) {
      selectItem.removeAttribute('disabled', 'disabled');
    });
    generateMarks(data);
  };

  window.map = {
    renderAds: renderAds,
    removeMarks: removeMarks,
    generateMarks: generateMarks
  };
})();
