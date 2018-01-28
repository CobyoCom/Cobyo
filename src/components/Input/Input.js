import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Input.css';

const Input = props => (
  <input
    className={cx(
      'Input',
      `Input-${props.size}`,
      {
        'Input--disabled': props.disabled
      }
    )}
    disabled={props.disabled}
    maxLength={props.maxLength}
    size={props.maxLength}
    value={props.value}
    onChange={props.onChange}
  />
);

Input.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  maxLength: PropTypes.number,
  value: PropTypes.string,
  onChange: PropTypes.func
};

Input.defaultProps = {
  size: 'medium',
  disabled: false,
  maxLength: 10,
  value: '',
  onChange: () => {}
};

export default Input;