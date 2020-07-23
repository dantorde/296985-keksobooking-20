'use strict';

(function () {
  var filterPrice = {
    'low': {
      start: 0,
      end: 10000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterItems = Array.from(document.querySelector('.map__filters').children);

  var filterRules = {
    'housing-type': function (data, filter) {
      return filter.value === data.offer.type;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= filterPrice[filter.value].start && data.offer.price < filterPrice[filter.value].end;
    },
    'housing-features': function (data, filter) {
      var checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

      return checkListElements.every(function (checkListElement) {
        return data.offer.features.some(function (feature) {
          return feature === checkListElement.value;
        });
      });
    }
  };

  var filterArray = function (array) {
    return array.filter(function (item) {
      return filterItems.every(function (filterItem) {
        return (filterItem.value === 'any') ? true : filterRules[filterItem.id](item, filterItem);
      });
    });
  };

  window.fiter = {
    array: filterArray
  };
})();
