import { Component } from 'react';
import { StyledOverlay, StyledModal } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  closeModal = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, onClose } = this.props;
    return (
      <StyledOverlay onClick={onClose}>
        <StyledModal>
          <img src={largeImageURL} alt="" />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
