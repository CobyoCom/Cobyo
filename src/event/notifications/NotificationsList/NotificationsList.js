import React from 'react';
import PropTypes from 'prop-types';
import NotificationListItem from '../NotificationsListItem/NotificationListItem';
import './NotificationsList.css';

const NotificationsList = props => (
  <div className="NotificationsList">
    {props.notifications.map(notification => (
      <NotificationListItem key={notification.createdAt} {...notification} />
    ))}
  </div>
);

NotificationsList.propTypes = {
  notifications: PropTypes.array
};

NotificationsList.defaultProps = {
  notifications: []
};

export default NotificationsList;
