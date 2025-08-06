
const bodyElement = document.querySelector('body');
const imageUploadContainer = document.querySelector('.img-upload');
const imageUploadForm = imageUploadContainer.querySelector('#upload-select-image');
const imageUploadInput = imageUploadForm.querySelector('#upload-file');
const imageUploadPopup = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadHashtagsInput = imageUploadForm.querySelector('input[name="hashtags"]');
const imageUploadCommentInput = imageUploadForm.querySelector('textarea[name="description"]');
const imageUploadCloseButton = imageUploadForm.querySelector('#upload-cancel');

const initPopup = (popup, body, closeButton, onClickCallback, onKeydownCallback) => {
  popup.classList.toggle('hidden');
  body.classList.toggle('modal-open');
  if (!popup.classList.contains('hidden')) {
    closeButton.addEventListener('click', onClickCallback);
    document.addEventListener('keydown', onKeydownCallback);
  } else {
    closeButton.removeEventListener('click', onClickCallback);
    document.removeEventListener('keydown', onKeydownCallback);
  }
};

const onEditCloseButtonClick = () => closeImageUploadPopup();

const onEditPopupKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeImageUploadPopup();
  }
};

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    evt.target.blur();
  }
};

function closeImageUploadPopup () {
  imageUploadForm.reset();
  initPopup(imageUploadPopup, bodyElement, imageUploadCloseButton, onEditCloseButtonClick, onEditPopupKeydown);
  imageUploadHashtagsInput.removeEventListener('keydown', onInputKeydown);
  imageUploadCommentInput.removeEventListener('keydown', onInputKeydown);
}

const initImageUploadPopup = () => {
  imageUploadInput.addEventListener('change', () => {
    initPopup(imageUploadPopup, bodyElement, imageUploadCloseButton, onEditCloseButtonClick, onEditPopupKeydown);
    imageUploadHashtagsInput.addEventListener('keydown', onInputKeydown);
    imageUploadCommentInput.addEventListener('keydown', onInputKeydown);
  });
}

export { bodyElement, imageUploadForm, imageUploadHashtagsInput, initPopup, initImageUploadPopup };
