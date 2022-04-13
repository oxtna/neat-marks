import Button from './Button';
import ColorPicker from './ColorPicker';
import PropTypes from 'prop-types';
import './Controls.css';

const Controls = ({ mode, onSelect, onAdd, onCancel, onOpen, onDelete, onDone }) => {
  const selectButton = <Button text="select" onClick={onSelect} />;
  const addButton = <Button text="add" onClick={onAdd} />;
  const cancelButton = <Button text="cancel" onClick={onCancel} />;
  const openButton = <Button text="open" onClick={onOpen} />;
  const deleteButton = <Button text="delete" onClick={onDelete} />;
  const doneButton = <Button text="done" onClick={onDone} />;

  return (
    <div className="controls">
      {mode === "normal" && selectButton}
      {mode === "normal" && addButton}
      {(mode === "select" || mode === "add") && cancelButton}
      {mode === "select" && openButton}
      {mode === "select" && deleteButton}
      {mode === "add" && doneButton}
      <ColorPicker initialColor="" />
    </div>
  );
};

Controls.propTypes = {
  mode: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired
};

export default Controls;
