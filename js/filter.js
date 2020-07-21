'use strict';

(function () {

  var FilterPrice = {
    MIN: 10000,
    MAX: 50000
  };

  var HousePriceValue = {
    LOW: 'low',
    HIGH: 'high',
    MIDDLE: 'middle'
  };

  var filterForm = document.querySelector('.map__filters');
  var selectHouseType = filterForm.querySelector('#housing-type');
  var selectHousePrice = filterForm.querySelector('#housing-price');
  var selectHouseRooms = filterForm.querySelector('#housing-rooms');
  var selectHouseGuests = filterForm.querySelector('#housing-guests');

  var filteredArray = function (element) {


    var houseType = selectHouseType.value;
    var housePrice = selectHousePrice.value;
    var houseRooms = selectHouseRooms.value.toString();
    var houseGuests = selectHouseGuests.value.toString();

    var isType = true;
    var isRooms = true;
    var isGuests = true;
    var isPrice = true;
    var isFeatures = true;

    var checkedFeatures = filterForm.querySelectorAll('input[name="features"]:checked');
    if (checkedFeatures.length) {
      checkedFeatures.forEach(function (feature) {
        if (element.offer.features.indexOf(feature.value) === -1) {
          isFeatures = false;
        }
      });
    }

    if (houseType !== 'any') {
      isType = element.offer.type === houseType;
    }
    if (houseRooms !== 'any') {
      isRooms = element.offer.rooms.toString() === houseRooms;
    }
    if (houseGuests !== 'any') {
      isGuests = element.offer.guests.toString() === houseGuests;
    }

    if (housePrice !== 'any') {
      var elementPrice = element.offer.price.toString();
      var price;
      if (elementPrice < FilterPrice.MIN) {
        price = HousePriceValue.LOW;
      }
      if (elementPrice > FilterPrice.MIN) {
        price = HousePriceValue.HIGH;
      }
      if (elementPrice < FilterPrice.MAX && elementPrice > FilterPrice.MIN) {
        price = HousePriceValue.MIDDLE;
      }
      isPrice = price === housePrice;
    }
    return isType && isRooms && isGuests && isPrice && isFeatures;
  };

  window.fiter = {
    array: filteredArray
  };
})();
