'use strict';

(function () {
  var COUNT_ADS = 8;
  var dataAds = window.data.createAds(COUNT_ADS);
  var mapBlock = document.querySelector('.map');
  var mainMark = document.querySelector('.map__pin--main');

  /**
  * деактивация и активация карты, формы и фильтра
  */
  var makeInactive = function (flag) {
    var adForm = document.querySelector('.ad-form');
    var fieldsetAdFormArr = adForm.querySelectorAll('fieldset');
    var filterForm = document.querySelector('.map__filters');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');

    if (flag === true) {
      adForm.classList.add('ad-form--disabled');
      fieldsetAdFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
      fieldsetFilterFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
    } else {
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      fieldsetAdFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled', 'disabled');
      });
      fieldsetFilterFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled', 'disabled');
      });
      window.map.generateMarks(dataAds);
      mainMark.removeEventListener('mousedown', onPressMainMark);
      mainMark.removeEventListener('keydown', onPressMainMark);
    }
  };

  /**
  * вызывает функцию при нажатии левой кнопки мыши или Enter
  * @param {Object} evt - объект хранит последнее событие
  */
  var onPressMainMark = function (evt) {
    if (evt.button === 0 || evt.key === 'Enter') {
      makeInactive(false);
    }
  };

  makeInactive(true);
  window.form.getAddress();
  mainMark.addEventListener('mousedown', onPressMainMark);
  mainMark.addEventListener('keydown', onPressMainMark);
})();
