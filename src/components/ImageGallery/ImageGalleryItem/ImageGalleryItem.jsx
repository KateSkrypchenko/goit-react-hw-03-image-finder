// import PropTypes from 'prop-types';
import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';

import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };

  handleKeyDown = event => {
    console.log(event);
    if (event.code === 'Escape') {
      this.setState({
        showModal: false,
      });
    }
  };

  handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      this.setState({
        showModal: false,
      });
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const { showModal } = this.state;
    const { largeImageURL, webformatURL, tags } = this.props;
    return (
      <div>
        <Item>
          <Image src={webformatURL} alt={tags} loading="lazy" onClick={this.openModal} />
        </Item>
        {showModal && <Modal largeImageURL={largeImageURL} onClose={this.handleBackdropClick} />}
      </div>
    );
  }
}

// ContactListItem.propTypes = {
//   id: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   number: PropTypes.string.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };
