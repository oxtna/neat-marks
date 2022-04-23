import PropTypes from 'prop-types';
import './SelectInput.css';

const SelectInput = ({ children, id, value, defaultValue, onChange }) => {
  return (
    <select
      className="select-input"
      id={id}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

SelectInput.propTypes = {
  children: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SelectInput;