import React from 'react';
import {ImageGalleryList, ImageGalleryItemImage} from './ImageGallery.styled'
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends React.Component {
  render() {
    const { id, webformatURL, largeImageURL } = this.props.hit;

    return (
      <ImageGalleryList className="ImageGalleryItem">
        <ImageGalleryItemImage
          onClick={this.props.onClick}
          src={webformatURL}
          id={id}
          largeimg={largeImageURL}
          alt="finding results"
        />
      </ImageGalleryList>
    );
  }
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  hit: PropTypes.object,
};
