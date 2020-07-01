'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainMark = document.querySelector('.map__pin--main');
  var marksMap = document.querySelector('.map__pins');

  /**
  * генерация меток на основе созданного массива объявлений
  * @param {array} dataAds - массив объктов
  * @return {object} объект
  */
  var onLoad = function (dataAds) {
    var marksFragment = document.createDocumentFragment();
    dataAds.forEach(function (dataAd) {
      marksFragment.appendChild(window.mark.create(dataAd));
    });
    return marksMap.appendChild(marksFragment);
  };


  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  /**
  * деактивация и активация карты, формы и фильтра
  * @param {param} flag - флаг
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
      window.backend.load(onLoad, onError);
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
