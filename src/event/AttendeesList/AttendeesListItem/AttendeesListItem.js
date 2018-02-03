import React from 'react';
import PropTypes from 'prop-types';
import {FaMale, FaCab, FaSubway, FaHome} from 'react-icons/lib/fa';
import moment from 'moment';
import {fromNow, addTime} from '../../../helpers/moment';
import {WALKING, DRIVING, TRANSIT, DEFAULT_TRAVEL_MODE} from '../../../helpers/globalConstants';
import './AttendeesListItem.css';

const getIcon = (hasLeft, travelMode) => {
  if (!hasLeft) {
    return <FaHome/>;
  }

  switch (travelMode) {
    case WALKING: return <FaMale/>;
    case DRIVING: return <FaCab/>;
    case TRANSIT: return <FaSubway/>;
    default: return null;
  }
};

const formatArrivalTime = eta => {
  return moment(eta).calendar(null, {
    sameDay: 'h:mm a',
    nextDay: '[Tomorrow at ] h:mm a',
    nextWeek: 'dddd h:mm a',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: '[-]'
  });
};

const AttendeesListItem = props => (
  <div className="AttendeesListItem">
    <div className="AttendeesListItem-content">
      <div>
        <div className="AttendeesListItem-icon">
          {getIcon(props.hasLeft, props.travelMode)}
        </div>
        <div className="AttendeesListItem-user">
          <h2 className="AttendeesListItem-name">
            {props.userName}
          </h2>
          <span className="AttendeesListItem-lut">
            {fromNow(props.lastUpdated)}
          </span>
        </div>
      </div>
      <div>
        <span className="AttendeesListItem-eta">
          {props.duration === null ? (
            formatArrivalTime(null)
          ): (
            formatArrivalTime(addTime(props.duration, props.lastUpdated).format('YYYY-MM-DD HH:mm'))
          )}
        </span>
      </div>
    </div>
  </div>
);

AttendeesListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  duration: PropTypes.number,
  lastUpdated: PropTypes.string,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
  hasLeft: PropTypes.bool
};

AttendeesListItem.defaultProps = {
  duration: null,
  lastUpdated: null,
  travelMode: DEFAULT_TRAVEL_MODE,
  hasLeft: false
};

export default AttendeesListItem;