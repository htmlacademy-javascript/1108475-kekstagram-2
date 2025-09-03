import { imageUploadForm } from './validation.js';

const FILE_TYPES = ['jpeg', 'jpg', 'png'];

const ImageScaleRange = {
  min: '25%',
  max: '100%',
  step: 25
};

const ImageEffects = {
  'chrome': {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1
  },
  'sepia': {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1
  },
  'marvin': {
    filter: 'invert',
    min: '0%',
    max: '100%',
    step: '1%'
  },
  'phobos': {
    filter: 'blur',
    min: '0px',
    max: '3px',
    step: '0.1px'
  },
  'heat': {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1
  }
};

const imageScaleInput = imageUploadForm.querySelector('.scale__control--value');
const imageScaleSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const imageScaleBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const imageEffectSliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const imageEffectSlider = imageEffectSliderContainer.querySelector('.effect-level__slider');
const imageEffectLevelInput = imageUploadForm.querySelector('input[name="effect-level"]');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = imageUploadForm.querySelectorAll('.effects__preview');

let currentImageFilter = '';

const changeImagePreviewScale = (scale) => {
  if (
    !(imageScaleInput.value === ImageScaleRange.min && scale < 0) &&
    !(imageScaleInput.value === ImageScaleRange.max && scale > 0)
  ) {
    imageScaleInput.value = `${parseInt(imageScaleInput.value, 10) + ImageScaleRange.step * scale}%`;
    imagePreview.style.transform = `scale(${parseInt(imageScaleInput.value, 10) / 100})`;
  }
};

const initImageScaleControls = () => {
  imageScaleSmallerButton.addEventListener('click', () => {
    changeImagePreviewScale(-1);
  });

  imageScaleBiggerButton.addEventListener('click', () => {
    changeImagePreviewScale(1);
  });
};


noUiSlider.create(imageEffectSlider, {
  range: {
    min: 0,
    max: 0,
  },
  start: 0,
  step: 0,
  connection: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

imageEffectSliderContainer.classList.toggle('hidden');

imageEffectSlider.noUiSlider.on('update', () => {
  const sliderValue = imageEffectSlider.noUiSlider.get();
  imageEffectLevelInput.value = sliderValue;

  switch (currentImageFilter) {
    case ImageEffects['chrome'].filter:
    case ImageEffects['sepia'].filter:
    case ImageEffects['heat'].filter:
      imagePreview.style.filter = `${currentImageFilter}(${sliderValue})`;
      break;
    case ImageEffects['marvin'].filter:
      imagePreview.style.filter = `${currentImageFilter}(${sliderValue}%)`;
      break;
    case ImageEffects['phobos'].filter:
      imagePreview.style.filter = `${currentImageFilter}(${sliderValue}px)`;
      break;
    default:
      imagePreview.style.filter = currentImageFilter;
      imageEffectLevelInput.value = '';
  }
});

imageUploadForm.addEventListener('change', () => {

  const effect = imageUploadForm['effect'].value;

  if (effect === 'none') {
    imageEffectSliderContainer.classList.add('hidden');
    imageEffectSlider.noUiSlider.reset();
    imagePreview.style.filter = '';
    imageEffectLevelInput.value = '';
  } else {
    imageEffectSliderContainer.classList.remove('hidden');

    imageEffectSlider.noUiSlider.updateOptions({
      range: {
        min: parseFloat(ImageEffects[effect].min),
        max: parseFloat(ImageEffects[effect].max)
      },
      start: parseFloat(ImageEffects[effect].max),
      step: parseFloat(ImageEffects[effect].step)
    });

    currentImageFilter = ImageEffects[effect].filter;

    imagePreview.style.filter = `${currentImageFilter}(${ImageEffects[effect].max})`;
    imageEffectLevelInput.value = imageEffectSlider.noUiSlider.get();
  }
});

const setImagePreview = (imageFile) => {
  const imageFileName = imageFile.name.toLowerCase();
  const fileUrl = URL.createObjectURL(imageFile);
  if (FILE_TYPES.some((type) => imageFileName.endsWith(type))) {
    imagePreview.src = fileUrl;
    effectsPreviews.forEach((preview) => (preview.style.backgroundImage = `url(${fileUrl})`));
  }
};

const resetImagePreview = () => {
  imageEffectSlider.noUiSlider.reset();
  imageEffectSliderContainer.classList.add('hidden');
  imagePreview.style = '';
};


export { initImageScaleControls, setImagePreview, resetImagePreview };
