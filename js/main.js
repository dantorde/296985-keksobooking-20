'use strict';
var COUNT_ADS = 8;
var MAIN_MARK_SIZE = 62;
var MARK_ARROW_HEIGHT = 22;
var MinimumPrice = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
adForm.classList.add('ad-form--disabled');
var fieldsetAdFormArr = adForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');
fieldsetAdFormArr.forEach(function (fieldsetItem) {
  fieldsetItem.setAttribute('disabled', 'disabled');
});
fieldsetFilterFormArr.forEach(function (fieldsetItem) {
  fieldsetItem.setAttribute('disabled', 'disabled');
});

var mainMark = document.querySelector('.map__pin--main');
var mainMarkX = parseInt(mainMark.style.left, 10);
var mainMarkY = parseInt(mainMark.style.top, 10);
var inputAddress = document.querySelector('#address');
inputAddress.value = Math.round(mainMarkX + MAIN_MARK_SIZE / 2) + ', ' + Math.round(mainMarkY + MAIN_MARK_SIZE + MARK_ARROW_HEIGHT);
var typeHousing = document.querySelector('#type');
var rentalPrice = document.querySelector('#price');
rentalPrice.min = MinimumPrice[typeHousing.value];
rentalPrice.placeholder = MinimumPrice[typeHousing.value];

/**
 * активации карты, формы и фильтра
 */
var makeActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fieldsetAdFormArr.forEach(function (fieldsetItem) {
    fieldsetItem.removeAttribute('disabled', 'disabled');
  });
  fieldsetFilterFormArr.forEach(function (fieldsetItem) {
    fieldsetItem.removeAttribute('disabled', 'disabled');
  });
  window.map.createMarks;
};

mainMark.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    makeActive();
  }
});

mainMark.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    makeActive();
  }
});
