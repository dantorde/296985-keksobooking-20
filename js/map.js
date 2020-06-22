'use strict';

(function () {
var marksMap = document.querySelector('.map__pins');
  var dataAds = window.data.createAds(8);
  console.log(dataAds);

      /**
     * генерация меток на основе созданного массива объявлений
     * @param {array} dataAds - массив объктов
     * @return {object} объект
     */
    var generateMarks = function (dataAds) {
      var marksFragment = document.createDocumentFragment();
      console.log(dataAds);
      dataAds.forEach(function (dataAd) {
        marksFragment.appendChild(window.mark.createMark(dataAd));
      });
      return marksFragment;

    },
    marksMap.appendChild(marksFragment);
  }
})();
