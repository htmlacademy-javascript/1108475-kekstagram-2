import { isEscapeKey } from './util.js';
import { togglePopup } from './image-upload.js';

const COMMENTS__BATCH = 5;

const Avatar = {
  WIDTH: '35',
  HEIGHT: '35'
};

const bigPictureContainer = document.querySelector('.big-picture');

const bigPicturePhoto = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureCommentsContainer = bigPictureContainer.querySelector('.social__comments');
const bigPictureCommentsCurrentCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');

const bigPictureCommentsLoadButton = bigPictureContainer.querySelector('.comments-loader');
const bigPictureCloseButton = bigPictureContainer.querySelector('.big-picture__cancel');

let currentCommentsCount = 0;
let allComments = [];


const createComment = ({avatar, name, message}) => {
  const bigPictureComment = document.createElement('li');
  bigPictureComment.classList.add('social__comment');

  const bigPictureCommentAvatar = document.createElement('img');
  bigPictureCommentAvatar.classList.add('social__picture');
  bigPictureCommentAvatar.src = avatar;
  bigPictureCommentAvatar.alt = name;
  bigPictureCommentAvatar.width = Avatar.WIDTH;
  bigPictureCommentAvatar.height = Avatar.HEIGHT;

  const bigPictureCommentMessage = document.createElement('p');
  bigPictureCommentMessage.classList.add('social__text');
  bigPictureCommentMessage.textContent = message;

  bigPictureComment.appendChild(bigPictureCommentAvatar);
  bigPictureComment.appendChild(bigPictureCommentMessage);

  return bigPictureComment;
};

const renderComments = () => {

  const slicedComments = allComments.slice(currentCommentsCount, currentCommentsCount + COMMENTS__BATCH);

  slicedComments.forEach((comment) => bigPictureCommentsContainer.appendChild(createComment(comment)));

  const commentsTotalAmount = slicedComments.length + currentCommentsCount;

  bigPictureCommentsCurrentCount.textContent = commentsTotalAmount;

  if (commentsTotalAmount >= allComments.length) {
    bigPictureCommentsLoadButton.classList.add('hidden');
  }

  currentCommentsCount += COMMENTS__BATCH;
};

const onCommentsLoadButtonClick = () => renderComments();

const openBigPicturePopup = ({ url, description, likes, comments }) => {
  togglePopup(bigPictureContainer, bigPictureCloseButton, onBigPictureCloseButtonClick, onBigPictureKeydown);
  bigPicturePhoto.src = url;
  bigPictureCaption.textContent = description;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsContainer.innerHTML = '';
  allComments = comments;
  bigPictureCommentsTotalCount.textContent = allComments.length;

  renderComments();

  bigPictureCommentsLoadButton.addEventListener('click', onCommentsLoadButtonClick);
};

const closeBigPicturePopup = () => {
  togglePopup(bigPictureContainer, bigPictureCloseButton, onBigPictureCloseButtonClick, onBigPictureKeydown);
  bigPictureCommentsLoadButton.classList.remove('hidden');
  currentCommentsCount = 0;

  bigPictureCommentsLoadButton.removeEventListener('click', onCommentsLoadButtonClick);
};

function onBigPictureKeydown (evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    closeBigPicturePopup();
  }
}

function onBigPictureCloseButtonClick () {
  closeBigPicturePopup();
}

export { openBigPicturePopup };
