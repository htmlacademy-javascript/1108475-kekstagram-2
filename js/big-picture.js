
const bodyElement = document.querySelector('body');
const bigPictureElement = document.querySelector('.big-picture');

const photoElement = bigPictureElement.querySelector('.big-picture__img img');
const captionElement = bigPictureElement.querySelector('.social__caption');
const likesElement = bigPictureElement.querySelector('.likes-count');
const commentsList = bigPictureElement.querySelector('.social__comments');
// const commentsCurrentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
// const commentsTotalCountElement = bigPictureElement.querySelector('.social__comment-total-count');

// const commentsloadButton = bigPictureElement.querySelector('.comments-loader');
const closeBigPictureButton = bigPictureElement.querySelector('.big-picture__cancel');

const COMMENTS__BATCH = 5;
let commentsCurrentCount = 0;
let allComments = [];


const createComment = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const commentAvatar = document.createElement('img');
  commentAvatar.classList.add('social__picture');
  commentAvatar.src = avatar;
  commentAvatar.alt = name;
  commentAvatar.width = '35';
  commentAvatar.height = '35';

  const commentMessage = document.createElement('p');
  commentMessage.classList.add('social__text');
  commentMessage.textContent = message;

  commentItem.appendChild(commentAvatar);
  commentItem.appendChild(commentMessage);

  return commentItem;
};

const renderComments = () => {

  const slicedComments = allComments.slice(commentsCurrentCount, commentsCurrentCount + COMMENTS__BATCH);

  slicedComments.forEach((comment) => commentsList.appendChild(createComment(comment)));

  // commentsCurrentCountElement.textContent = slicedComments.length + commentsCurrentCount;

  // if (slicedComments.length + commentsCurrentCount >= allComments.length) {
  //   commentsloadButton.classList.add('hidden');
  // }

  // commentsCurrentCount += COMMENTS__BATCH;
};

const closeBigPicture = () => {
  bigPictureElement.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
  // commentsloadButton.classList.remove('hidden');
  commentsCurrentCount = 0;

  // commentsloadButton.removeEventListener('click', renderComments);
  closeBigPictureButton.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onBigPictureKeydown);
};

function onBigPictureKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}


const openBigPicture = ({ url, description, likes, comments }) => {
  bigPictureElement.classList.toggle('hidden');
  bodyElement.classList.toggle('modal-open');
  photoElement.src = url;
  captionElement.textContent = description;
  likesElement.textContent = likes;
  commentsList.innerHTML = '';
  allComments = comments;
  // commentsTotalCountElement.textContent = allComments.length;

  renderComments();

  // commentsloadButton.addEventListener('click', renderComments);
  closeBigPictureButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onBigPictureKeydown);
};

export {openBigPicture};
