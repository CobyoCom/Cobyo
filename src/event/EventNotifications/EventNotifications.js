import React from 'react';
import PropTypes from 'prop-types';

const EventNotifications = props => (
  <div className="EventNotifications">
    {props.notifications.map(({id, message}) => (
      <div key={id}>
        {message}
      </div>
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