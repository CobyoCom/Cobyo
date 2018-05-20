import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {getColorByTime} from '../../helpers/colorPicker';
import './Button.css';

const buttonClassNames = props => cx(
  'Button',
  `Button--${props.size}`,
  `Button--${props.variation}`,
  {
    'Button--disabled': props.disabled
  }
);

const iconClassNames = props => cx(
  'Icon',
  `Icon--${props.size}`,
  `Icon--${props.disabled}`
);

const inlineStyles = props => {
  const styles = {};
  if (props.variation === 'primary') {
    styles.backgroundColor = getColorByTime();
  }

  return styles;
};

const Button = props => (
  <button
    className={props.iconOnly ? iconClassNames(props) : buttonClassNames(props)}
    disabled={props.disabled}
    onClick={props.onClick}
    autoFocus={props.autoFocus}
    style={inlineStyles(props)}
  >
    {props.icon && (
      <div className="Button-icon">
        {props.icon}
      </div>
    )}
    {props.children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  iconOnly: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit']),
  variation: PropTypes.oneOf(['primary', 'secondary']),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  children: null,
  icon: null,
  iconOnly: false,
  size: 'medium',
  type: 'button',
  variation: 'primary',
  autoFocus: false,
  disabled: false,
  onClick: () => {}
};

export default Button;