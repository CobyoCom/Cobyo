import React from 'react';
import PropTypes from 'prop-types';
import {fromNow} from '../../../helpers/moment';
import NotificationReactionList from '../NotificationReactionList/NotificationReactionList'
import NotificationReactionButton from '../NotificationReactionButton';
import './NotificationListItem.css';

const NotificationListItem = props => (
  <div
    key={props.id}
    className="NotificationListItem"
  >
    <div className="NotificationListItem-header">
      <span className="NotificationListItem-message">
        <strong>{props.userName}</strong>{` ${props.message}`}
      </span>
      <NotificationReactionButton notificationId={props.id} />
    </div>
    <div className="NotificationListItem-footer">
      <span className="NotificationListItem-timestamp">
        {fromNow(props.timestamp)}
      </span>
        <NotificationReactionList id={props.id} />
    </div>
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