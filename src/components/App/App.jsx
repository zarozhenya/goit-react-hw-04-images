import { Component } from 'react';

import { StyledApp } from './App.styled';

import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { loadPhotos } from 'api';

export class App extends Component {
  state = {
    items: [],
  };
  handleFormSubmit = async name => {
    const newItems = await loadPhotos(name);
    this.setState({ items: newItems });
  };
  render() {
    const { items } = this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery items={items} onItemClick={console.log} />
      </StyledApp>
    );
  }
}
