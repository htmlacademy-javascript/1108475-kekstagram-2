import { photos } from './data';
import { initImageUploadPopup } from './image-upload';
import { renderPictures } from './thumbnail-pictures';
import { initImageUploadForm } from './validation';

renderPictures(photos);
initImageUploadPopup();
initImageUploadForm();
