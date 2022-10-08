import { StyledItem, StyledImage } from './ImageGallery.styled';

export const ImageGalleryItem = ({ item, onClick }) => {
  return (
    <StyledItem onClick={() => onClick(item.largeImageURL)}>
      <StyledImage src={item.webformatURL} />
    </StyledItem>
  );
};
