import { Component } from 'react';
import { Box } from './App.styled';
import { SearchBar } from './Searchbar/SearchBar';
import Loader from './Loader/Loader';
import ButtonLoadMore from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import React from 'react';
import { Modal } from './Modal/Modal';
import { fetchImages } from './Api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    inputValue: '',
    items: [],
    isLoading: false,
    largeImageURL: null,
    total: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      return this.update();
    }
  }

  async update() {
    this.setState({ isLoading: true });
    try {
      await fetchImages(this.state.query, this.state.page).then(res => {
        if (!res.data.hits.length) {
          return toast(
            'There is no images with this request. Please, try again'
          );
        }
        this.setState(prevState => {
          return {
            items: [...prevState.items, ...res.data.hits],
            total: res.data.totalHits,
          };
        });
      });
    } catch (error) {
      console.log('Error');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.inputValue === this.state.query) {
      return;
    }

    this.setState({
      query: this.state.inputValue,
      items: [],
      total: null,
      page: 1,
    });
  };

  handleQueryChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({
      [name]: value,
    });
  };

  onClickLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  showModalImage = largeImageURL => {
    const item = this.state.items.find(
      item => item.largeImageURL === largeImageURL
    );
    this.setState({
      showModal: {
        largeImageURL: item.largeImageURL,
        tags: item.tags,
      },
    });
  };

  closeModalImage = () => {
    this.setState({ showModal: null });
  };

  render() {
    const { items, total, showModal, inputValue } = this.state;
    return (
      <Box px={3}>
        <SearchBar
          onSubmit={this.handleSubmit}
          value={inputValue}
          onChange={this.handleQueryChange}
        />
        {items.length > 0 ? (
          <ImageGallery images={items} openModal={this.showModalImage} />
        ) : null}
        {items.length < total && (
          <ButtonLoadMore text="Load More" onClick={this.onClickLoadMore} />
        )}
        {this.state.isLoading && <Loader />}
        {showModal && (
          <Modal
            largeImageUrl={showModal.largeImageURL}
            tags={showModal.tags}
            closeModal={this.closeModalImage}
          />
        )}

        
          <Toaster />
        
      </Box>
    );
  }
}
