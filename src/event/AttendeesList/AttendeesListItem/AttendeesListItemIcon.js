import React from 'react';
import PropTypes from 'prop-types';

const AttendeesListItemIcon = props => props.isClickable ? (
  <div
    className="AttendeesListItem-iconButton"
    onClick={props.onClick}
  >
    <div className="AttendeesListItem-icon">
      {props.icon}
    </div>
    {props.subIcon && (
      <div className="AttendeesListItem-subIcon">
        {props.subIcon}
      </div>
    )}
  </div>
) : (
  <div className="AttendeesListItem-iconButton">
    <div className="AttendeesListItem-icon">
      {props.icon}
    </div>
  </div>
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