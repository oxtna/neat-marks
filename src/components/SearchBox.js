import PropTypes from 'prop-types';
import './SearchBox.css';

const SearchBox = ({ onChange }) => {
  return (
    <>
      <label htmlFor="searchBoxInput" className="search-box-label">Search for: </label>
      <input id="searchBoxInput" type="search" className="search-box" onChange={onChange} />
    </>
  );
};

SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default SearchBox;
