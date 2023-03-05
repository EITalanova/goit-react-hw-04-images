import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ pictures, onImage }) => {
  return (
    <>
      {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li className={css.galleryItem} key={id}>
            <img
              className={css.galleryItemImage}
              src={webformatURL}
              alt={tags}
              onClick={() => onImage(largeImageURL, tags, id)}
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.string,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
  onImage: PropTypes.func,
};

export default ImageGalleryItem;
