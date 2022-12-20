import React from 'react';
import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ImageList>
      <ImageGalleryItem images={images} openModal={openModal} />
    </ImageList>
  );
};
