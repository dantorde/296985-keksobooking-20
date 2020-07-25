'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  /**
  * создание метки на основе template
  * @param {object} dataOffer - элемент массива объявлений
  * @return {element} - элемент
  */
  var createMark = function (dataOffer) {
    var markTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mark = markTemplate.cloneNode(true);
    mark.style.left = dataOffer.location.x - PinSize.X / 2 + 'px';
    mark.style.top = dataOffer.location.y - PinSize.Y + 'px';
    var img = mark.querySelector('img');
    img.src = dataOffer.author.avatar;
    img.alt = dataOffer.offer.title;
    mark.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.popup.openCard(dataOffer);
    });
    return mark;
  };

  var qcreateMark = function (dataOffer) {
    var markTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var mark = markTemplate.cloneNode(true);
    mark.style.left = dataOffer.location.x - PinSize.X / 2 + 'px';
    mark.style.top = dataOffer.location.y - PinSize.Y + 'px';
    var img = mark.querySelector('img');
    img.src = dataOffer.author.avatar;
    img.alt = dataOffer.offer.title;
    mark.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.popup.openCard(dataOffer);
    });
    return mark;
  };
  window.mark = {
    create: createMark,
    qcreateMark: qcreateMark
  };

})();
