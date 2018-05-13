import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import './RecentEvents.css';

const getFormattedLocation = location => location && location.split(',')[0];

const RecentEvents = props => (
  <div className="RecentEvents">
    {!!props.events.length && (
      <p>Back to</p>
    )}
    {props.events.map(({eventId, location}) =>
      <div
        key={eventId}
        className="RecentEvent"
      >
        <Button
          onClick={() => props.history.push(`/${eventId}`)}
          size="small"
          variation="secondary"
        >
          {getFormattedLocation(location)}
        </Button>
      </div>
    )}
  </div>
);

RecentEvents.propTypes = {
  events: PropTypes.array,
  history: PropTypes.object.isRequired
};

RecentEvents.defaultProps = {
  events: []
};

export default RecentEvents;