/* global chrome */
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
import './Bookmark.css';

const Bookmark = ({ title, href, selectable, checked, onCheckboxChange }) => {
  const checkbox = <Checkbox checked={checked} onChange={onCheckboxChange} />;

  const onClick = async () => {
    await chrome.tabs.create({ url: href });
  };

  return (
    <li className="bookmark">
      {selectable && checkbox}
      <button
        onClick={onClick}
        type="button"
        title={title}
        disabled={selectable}
      >
        {title}
      </button>
    </li>
  );
};

Bookmark.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  selectable: PropTypes.bool.isRequired,
  checked: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired
};

export default Bookmark;
