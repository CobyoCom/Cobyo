import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {getColorByTime} from '../../helpers/colorPicker';
import './Button.css';

const buttonClassNames = props => cx(
  'Button',
  `Button-${props.size}`,
  {
    'Button--disabled': props.disabled
  }
);

const iconClassNames = props => cx(
  'Icon',
  `Icon-${props.size}`,
  `Icon-${props.disabled}`
);

const Button = props => (
  <button
    className={props.iconOnly ? iconClassNames(props) : buttonClassNames(props)}
    disabled={props.disabled}
    onClick={props.onClick}
    autoFocus={props.autoFocus}
    style={props.useTimeColor ? {
      backgroundColor: getColorByTime()
    } : {}}
  >
    {props.icon && (
      <div className="Button-icon">
        {props.icon}
      </div>
    )}
    {props.children && (
      <div className="Button-children">
        {props.children}
      </div>
    )}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  iconOnly: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit']),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  useTimeColor: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: null,
  icon: null,
  iconOnly: false,
  size: 'medium',
  type: 'button',
  autoFocus: false,
  disabled: false,
  useTimeColor: true,
  onClick: () => {}
};

export default Button;