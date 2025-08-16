import {pristine, imageUploadForm, imageUploadHashtagsInput} from './validation';
import { resetImagePreview } from './image-edit';

const bodyElement = document.querySelector('body');
const imageUploadInput = imageUploadForm.querySelector('#upload-file');
const imageUploadPopup = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCommentInput = imageUploadForm.querySelector('textarea[name="description"]');
const imageUploadCloseButton = imageUploadForm.querySelector('#upload-cancel');

const togglePopup = (popup, closeButton, onClickCallback, onKeydownCallback) => {
  popup.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
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
    evt.preventDefault();
    closeImageUploadPopup();
  }
};

const onInputKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
  }
};

const onHashtagsInputKeydown = (evt) => onInputKeydown(evt);
const onCommentInputKeydown = (evt) => onInputKeydown(evt);

function closeImageUploadPopup () {
  imageUploadForm.reset();
  pristine.reset();
  resetImagePreview();
  togglePopup(imageUploadPopup, imageUploadCloseButton, onEditCloseButtonClick, onEditPopupKeydown);
  imageUploadHashtagsInput.removeEventListener('keydown', onHashtagsInputKeydown);
  imageUploadCommentInput.removeEventListener('keydown', onCommentInputKeydown);
}

const initImageUploadPopup = () => {
  imageUploadInput.addEventListener('change', () => {
    togglePopup(imageUploadPopup, imageUploadCloseButton, onEditCloseButtonClick, onEditPopupKeydown);
    imageUploadHashtagsInput.addEventListener('keydown', onHashtagsInputKeydown);
    imageUploadCommentInput.addEventListener('keydown', onCommentInputKeydown);
  });
};

export { togglePopup, initImageUploadPopup, closeImageUploadPopup, onEditPopupKeydown };
