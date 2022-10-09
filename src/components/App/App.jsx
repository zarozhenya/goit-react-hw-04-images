import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    shouldButtonRender: false,
    total: 0,
  };

  async componentDidUpdate(_, { query: prevQuery, page: prevPage }) {
    const { query, page, items: currentItems } = this.state;
    const isChangedPage = page !== prevPage;
    if (prevQuery !== query || isChangedPage) {
      this.setState({ isLoading: true });
      const { items, total } = await this.getPhotosAndTotal();
      if (items.length === 0) {
        toast.error('No found images');
        this.setState({ isLoading: false });
        return;
      }
      this.setState(({ items: prevItems }) => ({
        items: isChangedPage ? [...prevItems, ...items] : items,
        isLoading: false,
      }));
      if (currentItems.length + items.length < total) {
        this.setState({ shouldButtonRender: true });
      } else {
        this.setState({ shouldButtonRender: false, isLoading: false });
        return;
      }
    }
  }

  handleFormSubmit = async name => {
    this.setState({
      items: [],
      page: 1,
      query: name,
      shouldButtonRender: false,
    });
  };

  getPhotosAndTotal = async () => {
    const { items, total } = await fetchPhotos({
      name: this.state.query,
      page: this.state.page,
    });
    return { items, total };
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
    const { items, largeImageURL, isLoading, shouldButtonRender } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {isLoading && <Loader />}
        <ImageGallery items={items} onItemClick={this.openModal} />
        {shouldButtonRender && <Button onClick={this.onButtonClick} />}

        {largeImageURL && (
          <Modal onClose={this.closeModal} largeImageURL={largeImageURL} />
        )}
        <ToastContainer />
      </StyledApp>
    );
  }
}
