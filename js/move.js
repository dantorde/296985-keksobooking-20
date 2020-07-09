'use strict';
(function () {

  var MAIN_MARK_SIZE = 65;
  var MARK_ARROW_HEIGHT = 22;
  var MAX_LEFT = -MAIN_MARK_SIZE / 2;
  var MAX_RIGHT = 1200 - MAIN_MARK_SIZE / 2;
  var MAX_TOP = 43;
  var MAX_BOTTOM = 543;

  /**
  * получение адреса по координатам
  */
  var getAddress = function () {
    var mainMark = document.querySelector('.map__pin--main');
    var mainMarkX = parseInt(mainMark.style.left, 10);
    var mainMarkY = parseInt(mainMark.style.top, 10);
    var inputAddress = document.querySelector('#address');
    inputAddress.value = Math.round(mainMarkX + MAIN_MARK_SIZE / 2) + ', ' + Math.round(mainMarkY + MAIN_MARK_SIZE + MARK_ARROW_HEIGHT);
  };

  var mainMark = document.querySelector('.map__pin--main');

  mainMark.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Измененяет местоположение главного пина и адрес при движении мышью с зажатой клавишей
     * @param {Object} moveEvt событие при движении мышью
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (((mainMark.offsetLeft - shift.x) >= MAX_LEFT) && ((mainMark.offsetLeft - shift.x) <= MAX_RIGHT) && ((mainMark.offsetTop - shift.y) >= MAX_TOP) && ((mainMark.offsetTop - shift.y) <= MAX_BOTTOM)) {
        mainMark.style.top = (mainMark.offsetTop - shift.y) + 'px';
        mainMark.style.left = (mainMark.offsetLeft - shift.x) + 'px';
      }
      getAddress();
    };

    /**
     * При отпускании клавиши мыши удаляет слушатели событий
     * @param {Object} upEvt событие при отпускании клавиши мыши
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.move = {
    getAddress: getAddress
  };
})();
