'use strict';

(function () {
  var PinSize = {
    X: 50,
    Y: 70
  };
  /**
  * создание метки на основе template
  * @param {object} item - элемент
  * @return {element} - элемент
  */
  var createMark = function (item) {
    var markTemplate = document.querySelector('#pin')
    .content.querySelector('.map__pin');
    var mark = markTemplate.cloneNode(true);
    mark.style.left = item.location.x - PinSize.X / 2 + 'px';
    mark.style.top = item.location.y - PinSize.Y + 'px';
    var img = mark.querySelector('img');
    img.src = item.author.avatar;
    img.alt = item.offer.title;
    return mark;
  };
  window.mark = {
    create: createMark
  };

})();
