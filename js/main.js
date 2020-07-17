'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainMark = mapBlock.querySelector('.map__pin--main');
  var filterForm = mapBlock.querySelector('.map__filters');
  var MAX_AMAUNT_ADS = 5;
  var dataAds = [];


  function loadAds(data) {
    dataAds = data;
    window.map.renderAds(dataAds);
  }

  function onFilterChange() {
    window.map.removeMarks();
    window.card.clear();
    var filterAds = window.util.sliceArray(dataAds.filter(window.fiter.array), MAX_AMAUNT_ADS);
    window.map.renderAds(filterAds);
  }

  /**
  * деактивация и активация карты, формы и фильтра
  * @param {param} flag - флаг
  */
  var makeActivePage = function (flag) {
    var adForm = document.querySelector('.ad-form');
    var fieldsetAdFormArr = adForm.querySelectorAll('fieldset');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');

    if (flag) {
      mapBlock.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      fieldsetAdFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled', 'disabled');
      });
      window.backend.load(loadAds, window.error.showMessage);
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

  filterForm.addEventListener('change', window.debounce.out(onFilterChange));

})();
