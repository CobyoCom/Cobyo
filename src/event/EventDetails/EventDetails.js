import React from 'react';
import PropTypes from 'prop-types';
import './EventDetails.css';

const EventDetails = props => {
  return (
    <div className="EventDetails">
      <div className="EventDetails-location">
        {props.location.split(',')[0]}
      </div>
      {!!props.numAttendees && (
        <div className="EventDetails-numAttendees">{`${
          props.numAttendees
        } going`}</div>
      )}
    </div>
  );
};

EventDetails.propTypes = {
  eventId: PropTypes.string,
  location: PropTypes.string,
  showCopyClipboard: PropTypes.bool.isRequired,
  showCopyCheck: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired
};

EventDetails.defaultProps = {
  location: ''
};

export default EventDetails;
