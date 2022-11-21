import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {ImageList} from './ImageGallery.styled'
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import Button from 'components/Button/Button';

const KEY = '30111910-fcbec35c08207b4a6ef54194c';
class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
    showModal: false,
    largeImageURL: '',
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onClick = url => {
    this.setState({ largeImageURL: url});
    this.toggleModal();
  };

  loadNextPage = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };



  componentDidUpdate(prevProps, prevState) {

    const prevName = prevProps.search;
    const nextName = this.props.search;

    if (prevName !== nextName) {
      this.setState({ page: 1 });
    }

    if (prevName !== nextName || this.state.page !== prevState.page) {
      this.setState({ status: 'pending' });

      setTimeout(() => {
        fetch(
          `https://pixabay.com/api/?q=${nextName}&page=${this.state.page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
        )
          .then(response => response.json())
          .then(images => {
            if (images && images.hits.length === 0) {
              this.setState({ status: 'rejected' });
            } else {
              if (this.state.page === 1) {
                this.setState({ images: images.hits });
              } else {
                this.setState(prevState => ({
                  images: [...prevState.images, ...images.hits],
                }));
              }
              this.setState({ status: 'resolved' });
            }
          })
          .catch(error => {
            this.setState({ error, status: 'rejected' });
          });
      }, 1000);
    }
  }

  render() {
    const { images, status, showModal } = this.state;

    if (status === 'rejected') {
          return toast.error('Failed to find any images');
    }

    if (status === 'resolved' || status === 'pending') {
      return (
        <div>
          <ImageList>
            {images &&
              images.map(hit => (
                <ImageGalleryItem
                  hit={hit}
                  key={hit.id}
                  onClick={ this.onClick}
                   />
              ))}
          </ImageList>
          {status === 'resolved' && <Button loadNextPage={this.loadNextPage} />}
          {status === 'pending' && <Loader />}
          {showModal && (
            <Modal url={this.state.largeImageURL} onClose={this.toggleModal}/ >

          )}
          <Toaster />
        </div>
      );
    }
  }
}

 export default ImageGallery;
