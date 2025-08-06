import { initPopup, bodyElement } from './image-upload';

const COMMENTS__BATCH = 5;

const bigPictureContainer = document.querySelector('.big-picture');

const bigPicturePhoto = bigPictureContainer.querySelector('.big-picture__img img');
const bigPictureCaption = bigPictureContainer.querySelector('.social__caption');
const bigPictureLikes = bigPictureContainer.querySelector('.likes-count');
const bigPictureCommentsList = bigPictureContainer.querySelector('.social__comments');
const bigPictureCommentsCurrentCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');

const bigPictureCommentsLoadButton = bigPictureContainer.querySelector('.comments-loader');
const bigPictureCloseButton = bigPictureContainer.querySelector('.big-picture__cancel');

let commentsCurrentCount = 0;
let allComments = [];


const createComment = ({avatar, name, message}) => {
  const bigPictureComment = document.createElement('li');
  bigPictureComment.classList.add('social__comment');

  const bigPictureCommentAvatar = document.createElement('img');
  bigPictureCommentAvatar.classList.add('social__picture');
  bigPictureCommentAvatar.src = avatar;
  bigPictureCommentAvatar.alt = name;
  bigPictureCommentAvatar.width = '35';
  bigPictureCommentAvatar.height = '35';

  const bigPictureCommentMessage = document.createElement('p');
  bigPictureCommentMessage.classList.add('social__text');
  bigPictureCommentMessage.textContent = message;

  bigPictureComment.appendChild(bigPictureCommentAvatar);
  bigPictureComment.appendChild(bigPictureCommentMessage);

  return bigPictureComment;
};

const renderComments = () => {

  const slicedComments = allComments.slice(commentsCurrentCount, commentsCurrentCount + COMMENTS__BATCH);

  slicedComments.forEach((comment) => bigPictureCommentsList.appendChild(createComment(comment)));

  const commentsTotalAmount = slicedComments.length + commentsCurrentCount;

  bigPictureCommentsCurrentCount.textContent = commentsTotalAmount;

  if (commentsTotalAmount >= allComments.length) {
    bigPictureCommentsLoadButton.classList.add('hidden');
  }

  commentsCurrentCount += COMMENTS__BATCH;
};

const onCommentsLoadButtonClick = () => renderComments();

const openBigPicturePopup = ({ url, description, likes, comments }) => {
  initPopup(bigPictureContainer, bodyElement, bigPictureCloseButton, onBigPictureCloseButtonClick, onBigPictureKeydown);
  bigPicturePhoto.src = url;
  bigPictureCaption.textContent = description;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsList.innerHTML = '';
  allComments = comments;
  bigPictureCommentsTotalCount.textContent = allComments.length;

  renderComments();

  bigPictureCommentsLoadButton.addEventListener('click', onCommentsLoadButtonClick);
};

const closeBigPicturePopup = () => {
  initPopup(bigPictureContainer, bodyElement, bigPictureCloseButton, onBigPictureCloseButtonClick, onBigPictureKeydown);
  bigPictureCommentsLoadButton.classList.remove('hidden');
  commentsCurrentCount = 0;

  bigPictureCommentsLoadButton.removeEventListener('click', onCommentsLoadButtonClick);
};

function onBigPictureKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicturePopup();
  }
}

function onBigPictureCloseButtonClick () {
  closeBigPicturePopup();
}

export { openBigPicturePopup, bodyElement};
