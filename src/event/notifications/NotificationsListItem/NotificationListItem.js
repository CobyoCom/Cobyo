import React from 'react';
import PropTypes from 'prop-types';
import {fromNow} from '../../../helpers/moment';
import NotificationReactionList from '../NotificationReactionList/NotificationReactionList'
import NotificationReactionButton from '../NotificationReactionButton';
import './NotificationListItem.css';

const NotificationListItem = props => (
  <div
    key={props.createdAt}
    className="NotificationListItem"
  >
    <div className="NotificationListItem-header">
      <span className="NotificationListItem-message">
        <strong>{props.userName}</strong>{` ${props.message}`}
      </span>
      <NotificationReactionButton notificationId={props.createdAt} />
    </div>
    <div className="NotificationListItem-footer">
      <span className="NotificationListItem-timestamp">
        {fromNow(parseInt(props.createdAt, 10))}
      </span>
        <NotificationReactionList id={props.createdAt} />
    </div>
  </div>
);

NotificationListItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  reactions: PropTypes.array,
  message: PropTypes.string
};

NotificationListItem.defaultProps = {
  message: null,
  reactions: []
};

export default NotificationListItem;