'use strict';

(function () {
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
})();
