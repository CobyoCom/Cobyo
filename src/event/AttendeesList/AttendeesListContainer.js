import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  selectEventAttendees,
  selectMyETA,
  selectMyLUT,
  selectTravelMode,
  selectUserName
} from '../activeEventSelectors';
import {getAttendees} from '../eventActions';
import AttendeesListItem from './AttendeesListItem/AttendeesListItem';
import AttendeesList from './AttendeesList';

class AttendeesListContainer extends Component {
  static propTypes = {
    me: PropTypes.shape(AttendeesListItem.propTypes).isRequired,
    attendees: PropTypes.array,
    getAttendees: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: []
  };

  componentDidMount() {
    if (this.props.me.estimatedArrivalTime) {
      this.props.getAttendees();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.me.estimatedArrivalTime !== nextProps.me.estimatedArrivalTime) {
      this.props.getAttendees();
    }
  }

  render() {
    return (
      <AttendeesList {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectEventAttendees(state),
  me: {
    userName: selectUserName(state),
    estimatedArrivalTime: selectMyETA(state),
    lastUpdatedTime: selectMyLUT(state),
    travelMode: selectTravelMode(state)
  }
});

const mapDispatchToProps = {
  getAttendees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListContainer);