import PropTypes from 'prop-types';

import { StyledItem, StyledImage } from './ImageGallery.styled';

export const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <StyledItem onClick={() => onClick(item.largeImageURL)}>
      <StyledImage src={item.webformatURL} />
    </StyledItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
