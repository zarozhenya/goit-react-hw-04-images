import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const closeModal = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [onClose]);

  return (
    <StyledOverlay onClick={onClose}>
      <StyledModal>
        <img src={largeImageURL} alt="" />
      </StyledModal>
    </StyledOverlay>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
