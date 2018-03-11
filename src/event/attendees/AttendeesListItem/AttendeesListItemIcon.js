import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const RenderedElement = props => props.isClickable ? (
  <button
    className="AttendeesListItem-iconButton"
    onClick={props.onClick}
  >
    {props.children}
  </button>
) : (
  <div className="AttendeesListItem-iconButton">
    {props.children}
  </div>
);

const AttendeesListItemIcon = props => (
  <RenderedElement {...props}>
    <div className={cx(
      'AttendeesListItem-icon',
      {
        'AttendeesListItem-icon--spinner': !props.icon
      }
    )}>
      {props.icon}
    </div>
    {props.subIcon && (
      <div className="AttendeesListItem-subIcon">
        {props.subIcon}
      </div>
    )}
  </RenderedElement>
);

AttendeesListItemIcon.propTypes = {
  isClickable: PropTypes.bool.isRequired,
  icon: PropTypes.node,
  subIcon: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

AttendeesListItemIcon.defaultProps = {
  icon: null,
  subIcon: null
};

export default AttendeesListItemIcon;