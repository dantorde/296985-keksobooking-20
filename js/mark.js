'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  /**
  * создание метки на основе template
  * @param {object} dataAd - элемент массива объявлений
  * @return {element} - элемент
  */
  var createMark = function (dataAd) {
    var markTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
    var mark = markTemplate.cloneNode(true);
    mark.style.left = dataAd.location.x - PinSize.X / 2 + 'px';
    mark.style.top = dataAd.location.y - PinSize.Y + 'px';
    var img = mark.querySelector('img');
    img.src = dataAd.author.avatar;
    img.alt = dataAd.offer.title;
    mark.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.popup.openCard(dataAd);
    });
    return mark;
  };
  window.mark = {
    create: createMark
  };

})();
