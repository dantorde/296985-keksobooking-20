'use strict';

(function () {
  var marksMap = document.querySelector('.map__pins');

  /**
  * генерация меток на основе созданного массива объявлений
  * @param {array} dataAds - массив объктов
  * @return {object} объект
  */
  var generateMarks = function (dataAds) {
    var marksFragment = document.createDocumentFragment();
    dataAds.forEach(function (dataAd) {
      marksFragment.appendChild(window.mark.create(dataAd));
    });
    return marksMap.appendChild(marksFragment);
  };

  window.map = {
    generateMarks: generateMarks
  };
})();
