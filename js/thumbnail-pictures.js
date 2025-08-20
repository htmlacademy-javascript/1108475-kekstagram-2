import { getRandomArrElem, debounce } from './util';
import { getData } from './server';
import { showMessage, dataErrorMessagePopup } from './message-popup';
import { openBigPicturePopup } from './big-picture';

const RANDOM_IMAGES_MAX_LENGTH = 10;

const FilterTypes = {
  RANDOM: 'filter-random',
  MOST_COMMENTED: 'filter-discussed'
};

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesContainerFragment = document.createDocumentFragment();
const imagesFiltersContainer = document.querySelector('.img-filters');

let activeFilterButton = null;
let currentFilterType = '';
let currentPicturesList = [];

const renderPictures = (pictures) => {
  pictures.forEach(({ url, description, likes, comments }) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesContainerFragment.appendChild(pictureElement);

    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicturePopup({ url, description, likes, comments });
    });
  });

  picturesContainer.appendChild(picturesContainerFragment);
};


const initImagesFilters = (onFilterChangeCallback) => {
  imagesFiltersContainer.addEventListener('click', (evt) => {
    if (!evt.target.id || evt.target === activeFilterButton) {
      evt.preventDefault();
    } else {
      currentPicturesList = picturesContainer.querySelectorAll('.picture');

      if (currentPicturesList.length) {
        activeFilterButton.classList.remove('img-filters__button--active');
        evt.target.classList.add('img-filters__button--active');
        activeFilterButton = evt.target;
        currentFilterType = evt.target.id;
        onFilterChangeCallback();
      }
    }
  });
};

const filterImages = (images) => {

  switch (currentFilterType) {
    case FilterTypes.RANDOM: {
      const randomImages = [];
      while (randomImages.length < Math.min(images.length, RANDOM_IMAGES_MAX_LENGTH)) {
        const randomImage = getRandomArrElem(images);
        if (!randomImages.some((image) => image.id === randomImage.id)) {
          randomImages.push(randomImage);
        }
      }
      return randomImages;
    }
    case FilterTypes.MOST_COMMENTED:
      return images.toSorted((image, nextImage) => nextImage.comments.length - image.comments.length);
    default:
      return images;
  }
};


const getPhotos = async () => {
  try {
    const photos = await getData();
    renderPictures(photos);
    imagesFiltersContainer.classList.toggle('img-filters--inactive');
    activeFilterButton = imagesFiltersContainer.querySelector('.img-filters__button--active');
    initImagesFilters(debounce(() => {
      currentPicturesList.forEach((picture) => picture.remove());
      renderPictures(filterImages(photos));
    }));
  } catch {
    showMessage(dataErrorMessagePopup);
  }
};

export { renderPictures, getPhotos };
