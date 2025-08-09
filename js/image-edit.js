import { imageUploadForm } from './validation';

const imageScaleInput = imageUploadForm.querySelector('.scale__control--value');
const imageScaleSmallerButton = imageUploadForm.querySelector('.scale__control--smaller');
const imageScaleBiggerButton = imageUploadForm.querySelector('.scale__control--bigger');
const imageEffectsInputs = imageUploadForm.querySelectorAll('input[name="effect"]');
const imageEffectSliderContainer = imageUploadForm.querySelector('.img-upload__effect-level');
const imageEffectSlider = imageEffectSliderContainer.querySelector('.effect-level__slider');
const imageEffectLevelInput = imageUploadForm.querySelector('input[name="effect-level"]');
const imagePreview = imageUploadForm.querySelector('.img-upload__preview img');

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
  },
  'none': {
    filter: ''
  }
};

let currentImageFilter = '';

const initImageScaleControls = () => {
  imageScaleSmallerButton.addEventListener('click', (evt) => {
    if (imageScaleInput.value === ImageScaleRange.min) {
      evt.preventDefault();
    } else {
      imageScaleInput.value = `${parseInt(imageScaleInput.value, 10) - ImageScaleRange.step}%`;
      imagePreview.style.transform = `scale(${parseInt(imageScaleInput.value, 10) / 100})`;
    }
  });

  imageScaleBiggerButton.addEventListener('click', (evt) => {
    if (imageScaleInput.value === ImageScaleRange.max) {
      evt.preventDefault();
    } else {
      imageScaleInput.value = `${parseInt(imageScaleInput.value, 10) + ImageScaleRange.step}%`;
      imagePreview.style.transform = `scale(${parseInt(imageScaleInput.value, 10) / 100})`;
    }
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

imageEffectsInputs.forEach((input) => input.addEventListener('change', (evt) => {

  const effect = evt.target.value;

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
      start: parseFloat(ImageEffects[effect].min),
      step: parseFloat(ImageEffects[effect].step)
    });

    imagePreview.style.filter = `${ImageEffects[effect].filter}(${ImageEffects[effect].min})`;
    imageEffectLevelInput.value = imageEffectSlider.noUiSlider.get();
    currentImageFilter = ImageEffects[effect].filter;
  }
}));


export { initImageScaleControls, imagePreview, imageEffectSliderContainer, imageEffectSlider, imageEffectLevelInput };
