import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  selectEventId,
  selectEventTime,
  selectEventLocation,
  selectNumEventAttendees
} from '../activeEventSelectors';
import './EventDetails.css';

const EventDetails = props => {
  return (
    <div className="EventDetails">
      <div className="EventDetails-eventId">{props.eventId}</div>
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
  showDateTime: PropTypes.bool
};

EventDetails.defaultProps = {
  dateTime: null,
  location: '',
  showDateTime: false
};

const mapStateToProps = state => ({
  eventId: selectEventId(state),
  dateTime: selectEventTime(state),
  location: selectEventLocation(state),
  numAttendees: selectNumEventAttendees(state)
});

export default connect(
  mapStateToProps
)(EventDetails);