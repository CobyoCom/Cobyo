import React from 'react';
import PropTypes from 'prop-types';
import {fromNow} from '../../helpers/moment';
import './EventNotification.css';

const EventNotification = props => (
  <div
    key={props.id}
    className="EventNotification"
  >
    <div className="EventNotification-message">
      <span className="EventNotification-userName">{props.userName}</span>
      {` ${props.message}`}
    </div>
    <span className="EventNotification-timestamp">
      {fromNow(props.timestamp)}
      </span>
  </div>
);

EventNotification.propTypes = {
  id: PropTypes.number.isRequired,
  timestamp: PropTypes.string.isRequired,
  userName: PropTypes.string,
  message: PropTypes.string
};

EventNotification.defaultProps = {
  userName: null,
  message: null
};

export default EventNotification;