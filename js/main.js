
import { initImageUploadPopup } from './image-upload';
import { getPhotos } from './thumbnail-pictures';
import { initImageUploadForm } from './validation';
import { initImageScaleControls } from './image-edit';

getPhotos();
initImageUploadPopup();
initImageUploadForm();
initImageScaleControls();
