const MESSAGE_TIMEOUT = 5000;

const successMessagePopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessagePopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const dataErrorMessagePopup = document.querySelector('#data-error').content.querySelector('.data-error').cloneNode(true);

let message = null;
let messageCloseButton = null;


const onDocumentClick = (evt) => {
  if (evt.target === message) {
    evt.stopPropagation();
    removeMessage();
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.stopPropagation();
    evt.preventDefault();
    removeMessage();
  }
};

const onMessageButtonClick = () => removeMessage();

const showMessage = (messageElement) => {

  message = messageElement;

  document.body.appendChild(message);

  if (message.className.includes('data')) {
    setTimeout(() => {
      message.remove();
    }, MESSAGE_TIMEOUT);
  } else {
    messageCloseButton = message.querySelector('button');
    messageCloseButton.addEventListener('click', onMessageButtonClick);
    document.body.addEventListener('click', onDocumentClick);
    document.body.addEventListener('keydown', onDocumentKeydown);
  }
};

function removeMessage () {
  message.remove();
  messageCloseButton.removeEventListener('click', onMessageButtonClick);
  document.body.removeEventListener('click', onDocumentClick);
  document.body.removeEventListener('keydown', onDocumentKeydown);
}

export { showMessage, successMessagePopup, errorMessagePopup, dataErrorMessagePopup};
