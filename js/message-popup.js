import { isEscapeKey } from './util.js';

const MESSAGE_TIMEOUT = 5000;

const successMessagePopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessagePopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const dataErrorMessagePopup = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

let currentMessage = null;
let messageCloseButton = null;


const onDocumentClick = (evt) => {
  if (evt.target === currentMessage) {
    evt.stopPropagation();
    removeMessage();
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
    evt.preventDefault();
    removeMessage();
  }
};

const onMessageButtonClick = () => removeMessage();

const showMessage = (message) => {

  currentMessage = message;

  document.body.appendChild(currentMessage);

  if (currentMessage.classList.contains('data-error')) {
    setTimeout(() => {
      currentMessage.remove();
    }, MESSAGE_TIMEOUT);
  } else {
    messageCloseButton = currentMessage.querySelector('button');
    messageCloseButton.addEventListener('click', onMessageButtonClick);
    document.body.addEventListener('click', onDocumentClick);
    document.body.addEventListener('keydown', onDocumentKeydown);
  }
};

const showSuccessMessage = () => showMessage(successMessagePopup);
const showErrorMessage = () => showMessage(errorMessagePopup);
const showDataErrorMessage = () => showMessage(dataErrorMessagePopup);

function removeMessage () {
  currentMessage.remove();
  messageCloseButton.removeEventListener('click', onMessageButtonClick);
  document.body.removeEventListener('click', onDocumentClick);
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

export { showSuccessMessage, showErrorMessage, showDataErrorMessage };
