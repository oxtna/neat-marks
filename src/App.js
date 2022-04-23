/* global chrome */
import { useState } from 'react';
import BookmarkBox from './components/BookmarkBox';
import AddForm from './components/AddForm';
import Controls from './components/Controls';
import './App.css';

const flattenTree = async (tree, array = []) => {
  for (const node of tree) {
    if (node.url) {
      array.push(node);
    }
    else {
      const children = await chrome.bookmarks.getChildren(node.id).catch(err => console.error(err));
      await flattenTree(children, array).catch(err => console.error(err));
    }
  }
  return array;
};

const App = () => {
  const [mode, setMode] = useState("normal");
  const [selected, setSelected] = useState([]);
  const [currentFolder, setCurrentFolder] = useState("0");
  const [newBookmarkTitle, setNewBookmarkTitle] = useState("");
  const [newBookmarkUrl, setNewBookmarkUrl] = useState("");
  const [newBookmarkFolder, setNewBookmarkFolder] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);

  const onSelect = () => {
    if (mode !== "normal") {
      return;
    }

    setSelected([]);
    setMode("select");
  };

  const onAdd = async () => {
    if (mode !== "normal") {
      return;
    }
    const queryResult = await chrome.tabs
      .query({ active: true, currentWindow: true })
      .catch(err => console.error(err));
    const currentTab = queryResult[0];
    setNewBookmarkTitle(currentTab.title);
    setNewBookmarkUrl(currentTab.url);
    if (currentFolder === "0") {
      setNewBookmarkFolder("1");
    }
    else {
      setNewBookmarkFolder(currentFolder);
    }
    setCreatingFolder(false);
    setMode("add");
  };

  const onCancel = () => {
    if (mode === "normal") {
      return;
    }

    setSelected([]);
    setMode("normal");
  };

  const onOpen = async () => {
    if (mode !== "select") {
      return;
    }

    if (selected.length > 0) {
      const bookmarkNodes = await chrome.bookmarks.get(selected).catch(err => console.error(err));
      const bookmarks = await flattenTree(bookmarkNodes).catch(err => console.error(err));
      for (const bookmark of bookmarks) {
        await chrome.tabs.create({ url: bookmark.url }).catch(err => console.error(err));
      }
    }
    setSelected([]);
    setMode("normal");
  };


  const onDelete = async () => {
    if (mode !== "select") {
      return;
    }

    if (selected.length > 0) {
      const bookmarkNodes = await chrome.bookmarks.get(selected).catch(err => console.error(err));
      for (const node of bookmarkNodes) {
        if (node.url) {
          await chrome.bookmarks.remove(node.id).catch(err => console.error(err));
        }
        else {
          await chrome.bookmarks.removeTree(node.id).catch(err => console.error(err));
        }
      }
    }
    setSelected([]);
    setMode("normal");
  };

  const onDone = async () => {
    if (mode !== "add") {
      return;
    }

    if (creatingFolder) {
      await chrome.bookmarks
        .create({ parentId: newBookmarkFolder, title: newBookmarkTitle, url: null })
        .catch(err => console.error(err));
    }
    else {
      await chrome.bookmarks
        .create({ parentId: newBookmarkFolder, title: newBookmarkTitle, url: newBookmarkUrl })
        .catch(err => console.error(err));
    }
    setMode("normal");
  };

  return (
    <div className="app">
      <h1>Neatmarks</h1>
      {mode !== "add" &&
        <BookmarkBox
          currentFolder={currentFolder}
          setCurrentFolder={setCurrentFolder}
          mode={mode}
          selected={selected}
          setSelected={setSelected}
        />
      }
      {mode === "add" &&
        <AddForm
          title={newBookmarkTitle}
          setTitle={setNewBookmarkTitle}
          url={newBookmarkUrl}
          setUrl={setNewBookmarkUrl}
          folder={newBookmarkFolder}
          setFolder={setNewBookmarkFolder}
          creatingFolder={creatingFolder}
          setCreatingFolder={setCreatingFolder}
        />
      }
      <Controls
        mode={mode}
        onSelect={onSelect}
        onAdd={onAdd}
        onCancel={onCancel}
        onOpen={onOpen}
        onDelete={onDelete}
        onDone={onDone}
      />
    </div>
  );
};

export default App;
