// import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export const ImageGallery = ({ items }) => {
  return (
    <List>
      {items.map(({ id, ...otherProps }) => (
        <ImageGalleryItem key={id} {...otherProps} />
      ))}
    </List>
  );
};

// ContactList.propTypes = {
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       number: PropTypes.string.isRequired,
//     })
//   ),
//   onDelete: PropTypes.func.isRequired,
// };
