import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
import './BookmarkFolder.css';

const BookmarkFolder = ({ title, onClick, selectable, checked, onCheckboxChange }) => {
  const checkbox = <Checkbox checked={checked} onChange={onCheckboxChange} />;

  return (
    <li className="bookmark-folder">
      {selectable && checkbox}
      <button onClick={onClick} type="button" title={title}>
        📁 {title}
      </button>
    </li>
  );
};

BookmarkFolder.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selectable: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired
};

export default BookmarkFolder;
