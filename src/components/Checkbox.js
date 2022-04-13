import PropTypes from 'prop-types';
import './Checkbox.css';

const Checkbox = ({ checked, onChange, id }) => {
  return (
    <input id={id} checked={checked} onChange={onChange} className="checkbox" type="checkbox" />
  );
};

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string
};

export default Checkbox;