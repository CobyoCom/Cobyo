import React from 'react';
import PropTypes from 'prop-types';
import {FaMale, FaCab, FaSubway} from 'react-icons/lib/fa';
import moment from 'moment';
import {fromNow} from '../../../helpers/moment';
import {WALKING, DRIVING, TRANSIT} from '../../../helpers/globalConstants';
import './AttendeesListItem.css';

const formatArrivalTime = estimatedArrivalTime => {
  return moment(estimatedArrivalTime).calendar(null, {
    sameDay: 'h:mm a',
    nextDay: '[Tomorrow at ] h:mm a',
    nextWeek: 'dddd h:mm a',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: '[Invalid]'
  });
};

const AttendeesListItem = props => (
  <div className="AttendeesListItem">
    <div className="AttendeesListItem-content">
      <div>
        <div className="AttendeesListItem-icon">
          {props.travelMode === WALKING && <FaMale/>}
          {props.travelMode === DRIVING && <FaCab/>}
          {props.travelMode === TRANSIT && <FaSubway/>}
        </div>
        <div className="AttendeesListItem-user">
          <h2 className="AttendeesListItem-name">
            {props.userName}
          </h2>
          <span className="AttendeesListItem-lut">
            {fromNow(props.lastUpdatedTime)}
          </span>
        </div>
      </div>
      <div>
        <span className="AttendeesListItem-eta">
          {formatArrivalTime(props.estimatedArrivalTime)}
        </span>
      </div>
    </div>
  </div>
);

AttendeesListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  estimatedArrivalTime: PropTypes.string,
  lastUpdatedTime: PropTypes.string,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT])
};

export default AttendeesListItem;