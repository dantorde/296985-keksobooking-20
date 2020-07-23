'use strict';

(function () {
  var MAX_AMAUNT_ADS = 5;

  var sliceArray = function (array, maxCount) {
    return array.slice(0, maxCount);
  };

  window.util = {
    sliceArray: sliceArray,
    MAX_AMAUNT_ADS: MAX_AMAUNT_ADS
  };
})();
