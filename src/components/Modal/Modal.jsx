import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('keydown', this.props.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('componentWillUnmountut');
    window.removeEventListener('keydown', this.props.handleKeyDown);
  }
  render() {
    return createPortal(
      <Overlay onClick={this.props.onClose}>
        <ModalWindow>
          <img src={this.props.largeImageURL} alt="" />
        </ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}
