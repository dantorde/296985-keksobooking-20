'use strict';

(function () {
  var marksMap = document.querySelector('.map__pins');

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

  window.map = {
    generateMarks: generateMarks
  };
})();
