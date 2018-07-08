import React from 'react';
import PropTypes from 'prop-types';
import EventSettingsContainer from '../EventSettings/EventSettingsContainer';
import './EventDetails.css';

const EventDetails = props => {
  return (
    <div className="EventDetails">
      <div className="EventDetails-settings">
        {props.eventId && (
          <EventSettingsContainer/>
        )}
      </div>
      <div className="EventDetails-location">{props.location.split(',')[0]}</div>
      {!!props.numAttendees && (
        <div className="EventDetails-numAttendees">{`${props.numAttendees} going`}</div>
      )}
    </div>
  );
};

EventDetails.propTypes = {
  eventId: PropTypes.number,
  dateTime: PropTypes.number,
  location: PropTypes.string,
  showDateTime: PropTypes.bool,
  showCopyClipboard: PropTypes.bool.isRequired,
  showCopyCheck: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired
};

EventDetails.defaultProps = {
  dateTime: null,
  location: '',
  showDateTime: false
};



export default EventDetails;