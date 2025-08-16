import { getData } from './server';
import { showMessage, dataErrorMessagePopup } from './message-popup';
import { initImageUploadPopup } from './image-upload';
import { renderPictures } from './thumbnail-pictures';
import { initImageUploadForm } from './validation';
import { initImageScaleControls } from './image-edit';

const photos = await getData(() => showMessage(dataErrorMessagePopup));
renderPictures(photos);
initImageUploadPopup();
initImageUploadForm();
initImageScaleControls();
