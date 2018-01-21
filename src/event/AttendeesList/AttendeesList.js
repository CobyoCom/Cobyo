import React from 'react';
import PropTypes from 'prop-types';
import AttendeesListItemContainer from '../AttendeesListItem/AttendeesListItemContainer';
import './AttendeesList.css';

const AttendeesList = props => (
  <table className="AttendeesList">
    <AttendeesListItemContainer
      key={props.userName}
      userName={props.userName}
      estimatedArrivalTime={props.myETA}
      lastUpdatedTime={props.myLUT}
    />
    {props.attendees.map(attendee =>
      <AttendeesListItemContainer key={attendee.userName} {...attendee} />
    )}
  </table>
);

AttendeesList.propTypes = {
  attendees: PropTypes.array,
  userName: PropTypes.string
};

AttendeesList.defaultProps = {
  attendees: []
};

export default AttendeesList;