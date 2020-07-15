'use strict';

(function () {
  var MAX_AMAUNT_ADS = 5;
  var FilterPrice = {
    MIN: 10000,
    MAX: 50000
  };

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

/**
   * фильтрация пинов с последующей отрисовкой на странице пользователя
   * @param {Array} array - массив объектов
   */
  var typeFilter = function (array) {
    var housingType = document.querySelector('#housing-type');
    if (housingType.value === 'any') {
      var offers = array;
    } else {
      var offersType = array.filter(function (el) {
        return el.offer.type === housingType.value;
      });
      offers = offersType;
    }
  };

  var roomFilter = function (array) {
    var housingRooms = document.querySelector('#housing-rooms');
    if (housingRooms.value === 'any') {
      var offers = array;
    } else {
      offers = array.filter(function (el) {
        return el.offer.room === parseInt(housingRooms.value, 10);
      });
    }
  };

  var guestFilter = function (array) {
    var housingGuest = document.querySelector('#housing-guests');
    if (housingGuest.value === 'any') {
      var offers = array;
    } else {
      offers = array.filter(function (el) {
        return el.offer.guests === parseInt(housingGuest.value, 10);
      });
    }
  };

  var priceFilter = function (array) {
    var housingPrice = document.querySelector('#housing-price');
    if (housingPrice.value === 'any') {
      var offers = array;
    } else if (housingPrice.value === 'middle') {
      offers = array.filter(function (el) {
        return el.offer.price >= FilterPrice.MIN && el.offer.price <= FilterPrice.MAX;
      });
    } else if (housingPrice.value === 'low') {
      offers = array.filter(function (el) {
        return el.offer.price <= FilterPrice.MIN;
      });
    } else if (housingPrice.value === 'high') {
      offers = array.filter(function (el) {
        return el.offer.price >= FilterPrice.MAX;
      });
    }
  };

  var mapFilters = document.querySelector('.map__filters');
  var featureLists = mapFilters.querySelectorAll('input[name="features"]');

  /**
   * Возвращает список отмеченных удобств, получая список инпутов
   * @param {NodeList} featureList
   * @return {[]}
   */
  var getActiveFeatureList = function (featureList) {
    return Array.from(featureList)
      .filter(function (feature) {
        return feature.checked;
      })
      .map(function (feature) {
        return feature.value;
      });
  };

   /**
   * Возвращает true, если второй массив (arr2) содержится в первом (arr1).
   * @param {array} arr1
   * @param {array} arr2
   * @return {boolean}
   */
  var isСontains = function (arr1, arr2) {
    return arr2.every(function (item) {
      return arr1.includes(item);
    });
  };

  var featureFilter = function (array) {
    return array.filter(function (el) {
      return isСontains(el.offer.features, getActiveFeatureList(featureLists));
    });
  };

})();
