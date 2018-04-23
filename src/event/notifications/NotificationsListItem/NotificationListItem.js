import React from 'react';
import PropTypes from 'prop-types';
import {fromNow} from '../../../helpers/moment';
import './NotificationListItem.css';

const NotificationListItem = props => (
  <div
    key={props.id}
    className="NotificationListItem"
  >
    <div className="NotificationListItem-message">
      <span className="NotificationListItem-userName">{props.userName}</span>
      {` ${props.message}`}
    </div>
    <span className="NotificationListItem-timestamp">
      {fromNow(props.timestamp)}
      </span>
  </div>
);

NotificationListItem.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  userName: PropTypes.string,
  message: PropTypes.string
};

NotificationListItem.defaultProps = {
  userName: null,
  message: null
};

export default NotificationListItem;