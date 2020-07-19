'use strict';
(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;


  var loadData = function (onSuccess, onError, flag, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (flag) {
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    } else {
      xhr.open('GET', URL_LOAD);
      xhr.send();
    }

  };
  /**
   * Функция отправки данных на сервер
   * @param {Object} data - отправляемые данные
   * @param {Function} onSuccess - функция, отрабатываемая при успешной загрузке
   * @param {Function} onError - функция отрабатывает при возниковении ошибки
   */
  var save = function (data, onSuccess, onError) {
    loadData(onSuccess, onError, true, data);
  };

  /**
   * Функция получения данных с сервера
   * @param {Function} onSuccess - функция, отрабатываемая при успешной загрузке
   * @param {Function} onError - функция отрабатывает при возниковении ошибки
   */
  var load = function (onSuccess, onError) {
    loadData(onSuccess, onError);
  };

  window.backend = {
    load: load,
    save: save
  };
})();

