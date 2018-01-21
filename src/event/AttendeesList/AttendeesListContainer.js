import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectEventAttendees} from '../eventSelectors';
import AttendeesList from './AttendeesList';

class AttendeesListContainer extends Component {
  static propTypes = {
    attendees: PropTypes.array
  };

  static defaultProps = {
    attendees: []
  };

  render() {
    return (
      <AttendeesList {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectEventAttendees(state)
});

export default connect(
  mapStateToProps
)(AttendeesListContainer);