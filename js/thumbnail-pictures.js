const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');
const picturesContainerFragment = document.createDocumentFragment();

const renderPictures = function (pictures) {
  pictures.forEach(({url, description, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__img').alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesContainerFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(picturesContainerFragment);
};

export {renderPictures};
