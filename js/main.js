'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainMark = document.querySelector('.map__pin--main');

  /**
  * выводит ошибку в случае неуспешной загрузки с сервера
  * @param {param} errorMessage - сообщение
  */
  var showErrorMessage = function (errorMessage) {
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
      fieldsetFilterFormArr.forEach(function (fieldsetItem) {
        fieldsetItem.removeAttribute('disabled', 'disabled');
      });
      window.backend.load(window.load.ads, showErrorMessage);
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
