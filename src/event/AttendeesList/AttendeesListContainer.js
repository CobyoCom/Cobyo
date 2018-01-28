import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectEventAttendees, selectMyETA, selectMyLUT, selectUserName} from '../activeEventSelectors';
import {getAttendees} from '../eventActions';
import AttendeesList from './AttendeesList';

class AttendeesListContainer extends Component {
  static propTypes = {
    attendees: PropTypes.array,
    myETA: PropTypes.string,
    getAttendees: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: []
  };

  componentDidMount() {
    if (this.props.myETA) {
      this.props.getAttendees();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.myETA !== nextProps.myETA) {
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
  userName: selectUserName(state),
  myETA: selectMyETA(state),
  myLUT: selectMyLUT(state)
});

const mapDispatchToProps = {
  getAttendees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListContainer);