import React from 'react';
import PropTypes from 'prop-types';

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
    <div className="AttendeesListItem-icon">
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
  icon: PropTypes.node.isRequired,
  subIcon: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

AttendeesListItemIcon.defaultProps = {
  subIcon: null
};

export default AttendeesListItemIcon;