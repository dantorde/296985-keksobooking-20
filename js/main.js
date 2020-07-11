'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainMark = document.querySelector('.map__pin--main');

  /**
  * деактивация и активация карты, формы и фильтра
  * @param {param} flag - флаг
  */
  var makeActivePage = function (flag) {
    var adForm = document.querySelector('.ad-form');
    var fieldsetAdFormArr = adForm.querySelectorAll('fieldset');
    var filterForm = document.querySelector('.map__filters');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');

    if (flag) {
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      fieldsetAdFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled', 'disabled');
      });
      window.backend.load(window.load.ads, window.error.showMessage);
      mainMark.removeEventListener('mousedown', onClickMainMark);
      mainMark.removeEventListener('keydown', onPressMainMark);


    } else {
      adForm.classList.add('ad-form--disabled');
      fieldsetAdFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
      fieldsetFilterFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
    }
  };

  /**
  * вызывает функцию при нажатии левой кнопки мыши или Enter
  * @param {Object} evt - объект хранит последнее событие
  */
  var onClickMainMark = function (evt) {
    if (evt.button === 0) {
      makeActivePage(true);
    }
  };

  /**
  * вызывает функцию при нажатии левой кнопки мыши или Enter
  * @param {Object} evt - объект хранит последнее событие
  */
  var onPressMainMark = function (evt) {
    if (evt.key === 'Enter') {
      makeActivePage(true);
    }
  };

  makeActivePage(false);
  window.move.getAddress();
  mainMark.addEventListener('mousedown', onClickMainMark);
  mainMark.addEventListener('keydown', onPressMainMark);

})();
