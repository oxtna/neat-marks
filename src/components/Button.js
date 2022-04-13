import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ text, onClick, otherClassNames }) => {
  return (
    <button onClick={onClick} className={`button ${otherClassNames}`} type="button">
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  otherClassNames: PropTypes.string
};

export default Button;
