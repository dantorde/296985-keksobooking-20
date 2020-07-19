'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainMark = mapBlock.querySelector('.map__pin--main');
  var filterForm = mapBlock.querySelector('.map__filters');
  var MAX_AMAUNT_ADS = 5;
  var dataAds = [];
  var mapPinMain = document.querySelector('.map__pin--main');
  var defaultMainPinPosition = mapPinMain.style.cssText;
  var inputRoomNumber = document.querySelector('#room_number');
  var defaultInputRoomNumber = inputRoomNumber.value;
  var inputTimeIn = document.querySelector('#timein');
  var defaultInputTimeIn = inputTimeIn.value;
  var inputTimeOut = document.querySelector('#timeout');
  var defaultInputTimeOut = inputTimeOut.value;
  var inputRoomType = document.querySelector('#type');
  var defaultInputRoomType = inputRoomType.value;
  var inputTitle = document.querySelector('#title');
  var inputPrice = document.querySelector('#price');
  var inputDescription = document.querySelector('#description');

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
    var map = document.querySelector('.map');
    var adForm = document.querySelector('.ad-form');
    var fieldsetAdFormArr = adForm.querySelectorAll('fieldset');
    var fieldsetFilterFormArr = filterForm.querySelectorAll('fieldset');
    var selectFilterFormArr = filterForm.querySelectorAll('select');

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
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      fieldsetAdFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
      selectFilterFormArr.forEach(function (selectItem) {
        selectItem.setAttribute('disabled', 'disabled');
      });
      fieldsetFilterFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.setAttribute('disabled', 'disabled');
      });
      inputTitle.value = '';
      inputPrice.value = '';
      inputDescription.value = '';
      mapPinMain.style.cssText = defaultMainPinPosition;
      inputRoomNumber.value = defaultInputRoomNumber;
      inputRoomType.value = defaultInputRoomType;
      inputTimeIn.value = defaultInputTimeIn;
      inputTimeOut.value = defaultInputTimeOut;
      window.map.removeMarks();
      mainMark.addEventListener('mousedown', onClickMainMark);
      mainMark.addEventListener('keydown', onPressMainMark);
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

  filterForm.addEventListener('change', window.debounce.out(onFilterChange));

  window.main = {
    makeActivePage: makeActivePage
  };

})();
