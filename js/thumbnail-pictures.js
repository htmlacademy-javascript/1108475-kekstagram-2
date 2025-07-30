import { openBigPicture } from './big-picture';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesContainerFragment = document.createDocumentFragment();

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
      openBigPicture({url, description, likes, comments});
    });
  });

  picturesContainer.appendChild(picturesContainerFragment);
};

export { renderPictures };
