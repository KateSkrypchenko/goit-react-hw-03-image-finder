// import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, onClose }) => {
  return createPortal(
    <Overlay onClick={onClose}>
      <ModalWindow>
        <img src={largeImageURL} alt="" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};
