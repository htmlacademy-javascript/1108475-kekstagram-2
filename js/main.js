import { photos } from './data';
import { initImageUploadPopup } from './image-upload';
import { renderPictures } from './thumbnail-pictures';
import { initImageUploadForm } from './validation';
import { initImageScaleControls } from './image-edit';

renderPictures(photos);
initImageUploadPopup();
initImageUploadForm();
initImageScaleControls();
