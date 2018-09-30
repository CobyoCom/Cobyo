import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { selectEventAttendees, selectMe } from '../activeEventSelectors';
import {AttendeePropTypes} from '../attendees/AttendeesListItem/AttendeesListItem';
import AttendeeVisualizationContainer from './AttendeeVisualizationContainer';

class EventVisualizationContainer extends Component {

  static propTypes = {
    me: PropTypes.shape(AttendeePropTypes).isRequired,
    attendees: PropTypes.array.isRequired
  };

  render() {
    return (
      <svg width="100%" height={400}>
        <circle cx="50%" cy="50%" r={30} fill={"rgb(247, 204, 70)"}/>
        <AttendeeVisualizationContainer
          key={this.props.me.userName}
          {...this.props.me}
          isMe
        />
        {this.props.attendees.map(attendee => (
          <AttendeeVisualizationContainer key={attendee.userName} {...attendee} />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectEventAttendees(state),
  me: selectMe(state)
});

export default connect(
  mapStateToProps
)(EventVisualizationContainer);