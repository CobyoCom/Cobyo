import React from "react";
import PropTypes from "prop-types";
import {
  WALKING,
  DRIVING,
  TRANSIT,
  DEFAULT_TRAVEL_MODE
} from "../../../helpers/globalConstants";
import AttendeesListItemIcon from "./AttendeesListItemIcon";
import AttendeesListItemLoading from "./AttendeesListItemLoading";
import "./AttendeesListItem.css";

const AttendeesListItem = props => (
  <div className="AttendeesListItem" onClick={props.onClick}>
    <AttendeesListItemIcon
      travelMode={props.travelMode}
      isClickable={props.isMe && !props.hasProbablyArrived}
      onClick={props.onIconClick}
    />
    <div className="AttendeesListItem-content">
      <div className="AttendeesListItem-user">
        <h2 className="AttendeesListItem-name">{props.user.name}</h2>
        <span className="AttendeesListItem-lut">
          {props.isRefreshing ? (
            <AttendeesListItemLoading travelMode={props.travelMode} />
          ) : (
            props.updatedTimeStatus
          )}
        </span>
      </div>
    </div>
    <div className="AttendeesListItem-eta">{props.durationStatus}</div>
  </div>
);

const UserPropTypes = {
  name: PropTypes.string.isRequired
};

export const AttendeePropTypes = {
  user: PropTypes.shape(UserPropTypes),
  duration: PropTypes.number,
  updatedTime: PropTypes.string,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
  hasLeft: PropTypes.bool
};

export const AttendeeDefaultProps = {
  user: null,
  duration: null,
  updatedTime: null,
  travelMode: DEFAULT_TRAVEL_MODE,
  hasLeft: false
};

AttendeesListItem.propTypes = {
  ...AttendeePropTypes,
  isMe: PropTypes.bool,
  isRefreshing: PropTypes.bool,
  hasProbablyArrived: PropTypes.bool,
  durationStatus: PropTypes.string.isRequired,
  updatedTimeStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onIconClick: PropTypes.func.isRequired
};

AttendeesListItem.defaultProps = {
  ...AttendeeDefaultProps,
  isMe: false,
  isRefreshing: false,
  hasProbablyArrived: false
};

export default AttendeesListItem;
