import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Button.css';

const Button = props => (
  <button
    className={cx(
      'Button',
      `Button-${props.size}`,
      {
        'Button--disabled': props.disabled
      }
    )}
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit']),
  disabled: PropTypes.bool
};

Button.defaultProps = {
  children: null,
  onClick: () => {},
  size: 'medium',
  type: 'button',
  disabled: false
};

export default Button;