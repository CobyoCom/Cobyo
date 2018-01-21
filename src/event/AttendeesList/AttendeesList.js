import React from 'react';
import PropTypes from 'prop-types';
import AttendeesListItemContainer from '../AttendeesListItem/AttendeesListItemContainer';
import './AttendeesList.css';

const AttendeesList = props => (
  <table className="AttendeesList">
    {props.attendees.map(attendee =>
      <AttendeesListItemContainer key={attendee.userName} {...attendee} />
    )}
  </table>
);

AttendeesList.propTypes = {
  attendees: PropTypes.array
};

AttendeesList.defaultProps = {
  attendees: []
};

export default AttendeesList;