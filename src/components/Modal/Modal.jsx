import { ModalBox, Overlay } from './Modal.styled';
import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';


export const Modal = ({ largeImageUrl, closeModal }) =>{
  useEffect(() => {
  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.addEventListener('keydown', handleKeyDown);
  }
  }, )
  const handleKeyDown = element => {
    if(element.code === 'Escape'){
      closeModal();
    }
  }
  const hanleBackdropClick = e => {
    if(e.currentTarget === e.target){
      closeModal();
    }
  };

    return (
      <Overlay onClick={hanleBackdropClick}>
        <ModalBox>
          <img src={largeImageUrl} alt='img'/>
        </ModalBox>
      </Overlay>
    );
  }

  Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
  };