/* global chrome */
import { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';
import './AddForm.css';

const AddForm = ({ title, setTitle, url, setUrl, folder, setFolder, creatingFolder, setCreatingFolder }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    const findAllFolders = async () => {
      const _helperFunc = async (nodeID, array) => {
        const subTree = await chrome.bookmarks.getSubTree(nodeID).catch(err => console.error(err));
        const root = subTree[0];
        for (const node of root.children) {
          if (node.children) {
            array.push(node);
            await _helperFunc(node.id, array).catch(err => console.error(err));
          }
        }
      };
      const newFolders = [];
      await _helperFunc("0", newFolders).catch(err => console.error(err));
      setFolders(newFolders);
    };

    findAllFolders().catch(err => console.error(err));
  }, []);

  const folderOptions = folders.map(folder => {
    return <option value={folder.id} key={folder.id}>{folder.title}</option>;
  });

  const bookmarkInputs = (
    <>
      <label className="add-form-label" htmlFor="addFormTitle">Bookmark title: </label>
      <input className="add-form-input" id="addFormTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label className="add-form-label" htmlFor="addFormUrl">Bookmark URL: </label>
      <input className="add-form-input" id="addFormUrl" type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
    </>
  );

  const folderInputs = (
    <>
      <label className="add-form-label" htmlFor="addFormTitle">Folder title: </label>
      <input className="add-form-input" id="addFormTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
    </>
  );

  return (
    <form className="add-form">
      <label className="add-form-label" htmlFor="addFormCheckbox">Create folder? </label>
      <Checkbox
        id="addFormCheckbox"
        checked={creatingFolder}
        onChange={() => setCreatingFolder(!creatingFolder)}
      />
      {!creatingFolder && bookmarkInputs}
      {creatingFolder && folderInputs}
      <label className="add-form-label" htmlFor="addFormFolder">Folder: </label>
      <select
        className="add-form-select"
        id="addFormFolder"
        defaultValue={folder}
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
      >
        {folderOptions}
      </select>
    </form>
  );
};

AddForm.propTypes = {
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
  folder: PropTypes.string.isRequired,
  setFolder: PropTypes.func.isRequired,
  creatingFolder: PropTypes.bool.isRequired,
  setCreatingFolder: PropTypes.func.isRequired
};

export default AddForm;
