/* global chrome */
import { useEffect, useState } from 'react';
import Bookmark from './Bookmark';
import BookmarkFolder from './BookmarkFolder';
import Button from './Button';
import PropTypes from 'prop-types';
import './BookmarkList.css';

const BookmarkList = ({
  currentFolder,
  setCurrentFolder,
  searchFor,
  mode,
  selected,
  setSelected,
  previousFolders,
  setPreviousFolders
}) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarks = async () => {
      const children = await chrome.bookmarks.getChildren(currentFolder).catch(err => console.error(err));
      setBookmarks(children);
    };
    getBookmarks();
  }, [currentFolder]);

  const onBackClick = () => {
    setCurrentFolder(previousFolders.at(-1));
    setPreviousFolders(previousFolders.slice(0, previousFolders.length - 1));
  };

  const backButton = <Button text="<" onClick={onBackClick} otherClassNames="back-button" />;

  const onFolderClick = (folderID) => {
    if (mode === "select") {
      return;
    }

    setPreviousFolders([...previousFolders, currentFolder]);
    setCurrentFolder(folderID);
  };

  const onCheckboxChange = (id) => {
    if (selected.includes(id)) {
      const newSelected = selected.slice();
      newSelected.splice(selected.indexOf(id), 1);
      setSelected(newSelected);
    }
    else {
      setSelected([...selected, id]);
    }
  };

  const listItems = bookmarks.map(bookmarkNode => {
    // Case-insensitive search
    // Skip bookmarks and folders that do not contain `searchFor`
    if (!bookmarkNode.title.toLowerCase().includes(searchFor.toLowerCase())) {
      if (typeof bookmarkNode.url === "undefined") {
        return null;
      }
      if (!bookmarkNode.url.toLowerCase().includes(searchFor.toLowerCase())) {
        return null;
      }
    }

    // Folders do not have urls
    if (typeof bookmarkNode.url === "undefined") {
      return (
        <BookmarkFolder
          title={bookmarkNode.title}
          onClick={() => onFolderClick(bookmarkNode.id)}
          selectable={mode === "select"}
          checked={selected.includes(bookmarkNode.id)}
          onCheckboxChange={() => onCheckboxChange(bookmarkNode.id)}
          key={bookmarkNode.id}
        />
      );
    }

    return (
      <Bookmark
        title={bookmarkNode.title}
        href={bookmarkNode.url}
        selectable={mode === "select"}
        checked={selected.includes(bookmarkNode.id)}
        onCheckboxChange={() => onCheckboxChange(bookmarkNode.id)}
        key={bookmarkNode.id}
      />
    );
  });

  return (
    <div className="bookmark-list-container">
      {previousFolders.length > 0 && mode === "normal" && backButton}
      <ul className="bookmark-list">
        {listItems}
      </ul>
    </div>
  );
};

BookmarkList.propTypes = {
  currentFolder: PropTypes.string.isRequired,
  setCurrentFolder: PropTypes.string.isRequired,
  searchFor: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  previousFolders: PropTypes.array.isRequired,
  setPreviousFolders: PropTypes.func.isRequired
};

export default BookmarkList;
