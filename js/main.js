'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainMark = document.querySelector('.map__pin--main');

  /**
  * выводит элементы на карту в случае успешной загрузки с сервера
  * @param {array} dataAds - массив объявлений
  */
  var onLoad = function (dataAds) {
    window.map.generateMarks(dataAds);
  };

  /**
  * выводит ошибку в случае неуспешной загрузки с сервера
  * @param {param} errorMessage - сообщение
  */
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
      mainMark.removeEventListener('mousedown', onClickMainMark);
      mainMark.removeEventListener('keydown', onPressMainMark);
    }
  };

  /**
  * вызывает функцию при нажатии левой кнопки мыши или Enter
  * @param {Object} evt - объект хранит последнее событие
  */
  var onClickMainMark = function (evt) {
    if (evt.button === 0) {
      makeInactive(false);
    }
  };

  /**
  * вызывает функцию при нажатии левой кнопки мыши или Enter
  * @param {Object} evt - объект хранит последнее событие
  */
  var onPressMainMark = function (evt) {
    if (evt.key === 'Enter') {
      makeInactive(false);
    }
  };

  makeInactive(true);
  window.form.getAddress();
  mainMark.addEventListener('mousedown', onClickMainMark);
  mainMark.addEventListener('keydown', onPressMainMark);
})();
