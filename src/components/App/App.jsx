import { Component } from 'react';

import { StyledApp } from './App.styled';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';

import { fetchPhotos } from 'api';

export class App extends Component {
  state = {
    page: 1,
    items: [],
    largeImageURL: null,
    isLoading: false,
    query: '',
  };

  async componentDidUpdate(_, { query: prevQuery, page: prevPage }) {
    const { query, page } = this.state;
    if (prevQuery !== query) {
      this.setState({ isLoading: true });
      const items = await this.getPhotos();
      this.setState({ items: items, isLoading: false });
      return;
    }
    if (prevPage !== page) {
      this.setState({ isLoading: true });
      const items = await this.getPhotos();
      this.setState(({ items: prevItems }) => ({
        items: [...prevItems, ...items],
        isLoading: false,
      }));
      return;
    }
  }

  handleFormSubmit = async name => {
    this.setState({ items: [], page: 1, query: name });
  };

  getPhotos = async () => {
    const items = await fetchPhotos({
      name: this.state.query,
      page: this.state.page,
    });
    return items;
  };

  openModal = image => {
    this.setState({ largeImageURL: image });
  };

  closeModal = () => {
    this.setState({ largeImageURL: null });
  };

  onButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  render() {
    const { items, largeImageURL, isLoading } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {isLoading && <Loader />}
        <ImageGallery items={items} onItemClick={this.openModal} />
        {items.length > 0 && <Button onClick={this.onButtonClick} />}

        {largeImageURL && (
          <Modal onClose={this.closeModal} largeImageURL={largeImageURL} />
        )}
      </StyledApp>
    );
  }
}
