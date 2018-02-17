import React from 'react';
import PropTypes from 'prop-types';
import EventNotification from './EventNotification';
import './EventNotifications.css';

const EventNotifications = props => (
  <div className="EventNotifications">
    {props.notifications.map(notification => (
      <EventNotification
        key={notification.id}
        {...notification}
      />
    ))}
  </div>
);

EventNotifications.propTypes = {
  notifications: PropTypes.array
};

EventNotifications.defaultProps = {
  notifications: []
};

export default EventNotifications;