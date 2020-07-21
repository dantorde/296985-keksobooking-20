'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var PhotoPreviewElement = {
    ALT: 'Изображение жилья',
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreviewBlock = document.querySelector('.ad-form__photo');
  var avatarDefaultPicture = avatarPreview.src;


  var readerImage = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  /**
  * Функция создания изображения и добавления его в разметку
  * @return {*} photoElement
  */
  var createPhotoPreview = function () {
    var photoElement = document.createElement('img');
    photoElement.alt = PhotoPreviewElement.ALT;
    photoElement.style.width = PhotoPreviewElement.WIDTH;
    photoElement.style.height = PhotoPreviewElement.HEIGHT;

    return photoElement;
  };

  var clearPhotoInput = function () {
    avatarPreview.src = avatarDefaultPicture;
    photoPreviewBlock.innerHTML = '';
  };

  var onAvatarPress = function () {
    readerImage(avatarChooser, avatarPreview);
  };

  var onPhotoPress = function () {
    var photoPreview = createPhotoPreview();
    photoPreviewBlock.appendChild(photoPreview);
    readerImage(photoChooser, photoPreview);
  };

  window.photo = {
    onAvatarPress: onAvatarPress,
    onPhotoPress: onPhotoPress,
    clearPhotoInput: clearPhotoInput
  };

})();
