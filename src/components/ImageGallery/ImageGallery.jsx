import PropTypes from 'prop-types';

import { StyledList } from './ImageGallery.styled';
import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ items, onItemClick }) => {
  return (
    <StyledList>
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} onClick={onItemClick} />
      ))}
    </StyledList>
  );
};

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onItemClick: PropTypes.func.isRequired,
};
