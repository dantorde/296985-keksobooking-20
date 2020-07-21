'use strict';

(function () {
  var LEFT_MOUSE_BUTTON_CODE = 0;

  var minimumPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var roomsGuests = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var roomsSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var formAddАdvert = document.querySelector('.ad-form');
  var resetButton = document.querySelector('.ad-form__reset');

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');

  var onFormResetPress = function () {
    window.main.makeActivePage(false);
  };

  /**
   * Вызывает функцию отправки данных на сервер
   * @param {Object} evt - событие submit
   */
  var onSubmitPress = function (evt) {
    window.backend.save(new FormData(formAddАdvert), function () {
      window.main.makeActivePage(false);
      sendPopupShow();
    }, errorPopupShow);
    evt.preventDefault();
  };


  /**
   * Проверка на левую кнопку мыши и запуск функции скрытия окна успешной отправки или ошибки
   * @param {Object} evt - нажатая кнопка мыши
   */
  var onPopupMousePress = function (evt) {
    if (evt.button === LEFT_MOUSE_BUTTON_CODE && document.querySelector('.success') !== null) {
      closePopup(true);
    } else if (evt.button === LEFT_MOUSE_BUTTON_CODE && evt.target.classList.value !== 'error__message' && document.querySelector('.error') !== null) {
      closePopup(false);
    }
  };

  /**
   * функция появления и скрытия сообщения об Успехе при отправке формы на сервер
   */
  var sendPopupShow = function () {
    var successTemplate = document.querySelector('#success').content;
    var success = successTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(success);
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('mousedown', onPopupMousePress);
  };

  var closePopup = function (flag) {
    if (flag) {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', onPopupEscPress);
    } else {
      document.querySelector('.error').remove();
      document.removeEventListener('keydown', onPopupEscPress);
    }
    document.removeEventListener('mousedown', onPopupMousePress);
  };
  /**
   * Проверка на клавишу ESC и запуск функции скрытия окна ошибки или окна успешной отправки
   * @param {Object} evt - нажатая клавиша
   */
  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape' && document.querySelector('.success') !== null) {
      evt.preventDefault();
      closePopup(true);
    } else if (evt.key === 'Escape' && document.querySelector('.error') !== null) {
      closePopup(false);
    }
  };


  /**
   * функция появления и скрытия сообщения об Ошибке при отправке формы на сервер
   */
  var errorPopupShow = function () {
    var successTemplate = document.querySelector('#error').content;
    var error = successTemplate.cloneNode(true);
    var main = document.querySelector('main');
    main.appendChild(error);

    var errorShow = document.querySelector('.error');
    var errorButton = errorShow.querySelector('.error__button');

    document.addEventListener('click', onPopupMousePress);

    document.addEventListener('keydown', onPopupEscPress);

    errorButton.addEventListener('mousedown', function (evt) {
      if (evt.button === LEFT_MOUSE_BUTTON_CODE) {
        document.querySelector('.error').remove();
        document.removeEventListener('mousedown', onPopupMousePress);
        document.removeEventListener('keydown', onPopupEscPress);
      }
    });
  };

  /**
   * проверка соответствия количества комнат количеству гостей
   */
  var checkGuestRoomConformity = function () {
    var currentGuests = parseInt(guestsSelect.value, 10);
    if (!roomsGuests[roomsSelect.value].includes(currentGuests)) {
      guestsSelect.setCustomValidity('Выберите другое количество комнат или гостей');
    } else {
      guestsSelect.setCustomValidity('');
    }
  };

  /**
   * получение соответствия времени заезда и времени выезда
   * @param {Object} evt - объект хранит последнее событие
   */
  var setTimeValue = function (evt) {
    var timeFields = document.querySelector('.ad-form__element--time');
    var selectFields = timeFields.querySelectorAll('select');
    selectFields.forEach(function (selectItem) {
      selectItem.selectedIndex = evt.target.selectedIndex;
    });
  };

  /**
   * Проверяет валидность залоговока (ограничение по длине)
   */
  var titleAdInput = document.querySelector('#title');
  var minTitleLength = titleAdInput.getAttribute('minlength');
  var maxTitleLength = titleAdInput.getAttribute('maxlength');
  titleAdInput.addEventListener('invalid', function () {
    if (titleAdInput.validity.valueMissing) {
      titleAdInput.setCustomValidity('Обязательное поле');
    } else {
      titleAdInput.setCustomValidity('');
    }
  });

  titleAdInput.addEventListener('input', function () {
    var valueLength = titleAdInput.value.length;
    if (valueLength < minTitleLength) {
      titleAdInput.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' симв.');
    } else if (valueLength > maxTitleLength) {
      titleAdInput.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLength) + ' симв.');
    } else {
      titleAdInput.setCustomValidity('');
    }
  });

  /**
   * Устанавливает минимальное значение поля 'Цена' при изменении типа жилья
   */
  var typeHousing = document.querySelector('#type');
  var rentalPrice = document.querySelector('#price');
  rentalPrice.min = minimumPrice[typeHousing.value];
  rentalPrice.placeholder = minimumPrice[typeHousing.value];
  typeHousing.addEventListener('change', function () {
    rentalPrice.min = minimumPrice[typeHousing.value];
    rentalPrice.placeholder = minimumPrice[typeHousing.value];
  });


  roomsSelect.addEventListener('change', checkGuestRoomConformity);
  guestsSelect.addEventListener('change', checkGuestRoomConformity);
  var timeFields = document.querySelector('.ad-form__element--time');
  timeFields.addEventListener('change', setTimeValue);

  resetButton.addEventListener('click', onFormResetPress);

  formAddАdvert.addEventListener('submit', onSubmitPress);

  avatarChooser.addEventListener('change', window.photo.onAvatarPress);
  photoChooser.addEventListener('change', window.photo.onPhotoPress);

})();
