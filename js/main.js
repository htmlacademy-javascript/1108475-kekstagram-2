
import { initImageUploadPopup } from './image-upload.js';
import { getPhotos } from './thumbnail-pictures.js';
import { initImageUploadForm } from './validation.js';
import { initImageScaleControls } from './image-edit.js';

getPhotos();
initImageUploadPopup();
initImageUploadForm();
initImageScaleControls();
