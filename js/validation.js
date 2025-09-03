import { sendData } from './server.js';
import { closeImageUploadPopup } from './image-upload.js';
import { showSuccessMessage, showErrorMessage } from './message-popup.js';

const HASHTAG_MAX_LENGTH = 20;
const HASHTAGS_MAX_AMOUNT = 5;

const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadHashtagsInput = imageUploadForm.querySelector('input[name="hashtags"]');
const imageUploadSubmitButton = imageUploadForm.querySelector('#upload-submit');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error',
});

let errorMessage = '';

const setErrorMessage = () => errorMessage;

const validateHashtags = (value) => {
  if (!value.trim().length) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);
  const hashtagRegex = /^[a-zaа-яё0-9]+$/i;

  errorMessage = '';

  const hashtagsValidations = [
    {
      validation: hashtags.some((hashtag) => !hashtag.startsWith('#')),
      errorText: 'Хэштег должнен начинаться с решётки'
    },
    {
      validation: hashtags.some((hashtag) => hashtag === '#'),
      errorText: 'Хэштег не должен содержать только решётку'
    },
    {
      validation: hashtags.some((hashtag) => hashtag.slice(1).includes('#')),
      errorText: 'Хэштеги должны разделяться пробелами'
    },
    {
      validation: hashtags.some((hashtag) => !hashtagRegex.test(hashtag.slice(1))),
      errorText: 'После решётки только буквы и цифры'
    },
    {
      validation: hashtags.some((hashtag, index, arr) => arr.includes(hashtag, index + 1)),
      errorText: 'Хэштеги не должны повторяться'
    },
    {
      validation: hashtags.some((hashtag) => hashtag.length > HASHTAG_MAX_LENGTH),
      errorText: `Длина хэштега не более ${HASHTAG_MAX_LENGTH} символов`
    },
    {
      validation: hashtags.length > HASHTAGS_MAX_AMOUNT,
      errorText: `Не более ${HASHTAGS_MAX_AMOUNT} хэштегов`
    }
  ];

  const hashtagsAreValid = hashtagsValidations.every((item) => {
    const validationFailed = item.validation;
    if (validationFailed) {
      errorMessage = item.errorText;
    }

    return !validationFailed;
  });

  return hashtagsAreValid;
};

pristine.addValidator(imageUploadHashtagsInput, validateHashtags, setErrorMessage, 0, false);

const submitForm = async () => {
  const formIsValid = pristine.validate();
  if (formIsValid) {
    imageUploadSubmitButton.disabled = true;
    try {
      await sendData(new FormData(imageUploadForm));
      showSuccessMessage();
      closeImageUploadPopup();
    } catch {
      showErrorMessage();
    } finally {
      imageUploadSubmitButton.disabled = false;
    }
  }
};

const initImageUploadForm = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    imageUploadHashtagsInput.value = imageUploadHashtagsInput.value.trim().replaceAll(/\s\s+/g, ' ');
    submitForm();
  });
};

export { imageUploadForm, imageUploadHashtagsInput, initImageUploadForm, pristine };

