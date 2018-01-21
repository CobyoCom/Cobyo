import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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
  <tr
    className="AttendeesListItem"
    onClick={props.onClick}
  >
    <div
      className="AttendeesListItem-content"
    >
      <div>{props.userName}</div>
      <div>{formatArrivalTime(props.estimatedArrivalTime)}</div>
    </div>
    {props.isExpanded &&
      <div>
        {moment().to(props.lastUpdatedTime)}
      </div>
    }
  </tr>
);

AttendeesListItem.propTypes = {
  userName: PropTypes.string.isRequired,
  estimatedArrivalTime: PropTypes.string,
  lastUpdatedTime: PropTypes.string,
  isExanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

AttendeesListItem.defaultProps = {
  estimatedArrivalTime: '',
  lastUpdatedTime: '',
  isExpanded: false
};

export default AttendeesListItem;