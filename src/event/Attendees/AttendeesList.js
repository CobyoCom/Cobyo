import React from 'react';
import PropTypes from 'prop-types';
import {AttendeePropTypes} from './AttendeesListItem';
import AttendeesListItemContainer from './AttendeesListItemContainer';
import './AttendeesList.css';

const AttendeesList = props => (
  <div className="AttendeesList">
    <AttendeesListItemContainer
      key={props.me.userName}
      {...props.me}
    />
    {props.attendees.map(attendee =>
      <AttendeesListItemContainer key={attendee.userName} {...attendee} />
    )}
  </div>
);

AttendeesList.propTypes = {
  me: PropTypes.shape(AttendeePropTypes).isRequired,
  attendees: PropTypes.array
};

AttendeesList.defaultProps = {
  attendees: []
};

export default AttendeesList;