import { Component } from 'react';

import { StyledApp } from './App.styled';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { loadPhotos } from 'api';

export class App extends Component {
  state = {
    items: [],
    largeImageURL: null,
  };

  handleFormSubmit = async name => {
    const newItems = await loadPhotos(name);
    this.setState({ items: newItems });
  };

  openModal = image => {
    this.setState({ largeImageURL: image });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };
  render() {
    const { items, largeImageURL } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery items={items} onItemClick={this.openModal} />
        {largeImageURL && (
          <Modal onClose={this.closeModal} largeImageURL={largeImageURL} />
        )}
      </StyledApp>
    );
  }
}
