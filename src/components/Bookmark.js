import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
import './Bookmark.css';

const Bookmark = ({ title, href, selectable, checked, onCheckboxChange }) => {
  const checkbox = <Checkbox checked={checked} onChange={onCheckboxChange} />;

  return (
    <li className="bookmark">
      {selectable && checkbox}
      <a href={href} target="_blank" rel="external nofollow noopener noreferrer" title={title}>
        {title}
      </a>
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
