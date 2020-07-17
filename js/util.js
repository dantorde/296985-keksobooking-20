'use strict';

(function () {
  var sliceArray = function (array, maxCount) {
    return array.slice(0, maxCount);
  };

  window.util = {
    sliceArray: sliceArray
  };
})();
