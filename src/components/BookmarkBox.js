import { useState } from 'react';
import BookmarkList from './BookmarkList';
import SearchBox from './SearchBox';
import PropTypes from 'prop-types';
import './BookmarkBox.css';

const BookmarkBox = ({ currentFolder, setCurrentFolder, mode, selected, setSelected, previousFolders, setPreviousFolders }) => {
  const [searched, setSearched] = useState("");

  const onSearchChange = (event) => {
    setSearched(event.target.value);
  };

  return (
    <div className="bookmark-box">
      <SearchBox onChange={onSearchChange} />
      <BookmarkList
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
        searchFor={searched}
        mode={mode}
        selected={selected}
        setSelected={setSelected}
        previousFolders={previousFolders}
        setPreviousFolders={setPreviousFolders}
      />
    </div>
  );
};

BookmarkBox.propTypes = {
  currentFolder: PropTypes.string.isRequired,
  setCurrentFolder: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  previousFolders: PropTypes.array.isRequired,
  setPreviousFolders: PropTypes.func.isRequired
};

export default BookmarkBox;
