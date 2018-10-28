import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeesList from "./AttendeesList";
import {
  selectActiveEventCode,
  selectActiveEventAttendeesList
} from "../../activeEventSelectors";
import { fetchEventUsers } from "../../eventActions";

class AttendeesListContainer extends Component {
  static propTypes = {
    attendees: PropTypes.array,
    selectedAttendee: PropTypes.object,
    deselectAttendee: PropTypes.func.isRequired,
    fetchEventUsers: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: [],
    selectedAttendee: null,
    deselectAttendee() {}
  };

  state = {
    seconds: 0
  };

  componentDidMount() {
    this.props.fetchEventUsers();

    const seconds = 10;
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + seconds
      }));
    }, seconds * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleModalClose = () => this.props.deselectAttendee();

  render() {
    return (
      <AttendeesList
        attendees={this.props.attendees}
        selectedAttendee={this.props.selectedAttendee}
        onModalClose={this.handleModalClose}
        seconds={this.state.seconds}
      />
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectActiveEventAttendeesList(state),
  code: selectActiveEventCode(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchEventUsers
});

const mergeProps = (stateProps, dispatchProps) => {
  const { code, attendees } = stateProps;
  const { dispatch, fetchEventUsers } = dispatchProps;
  return {
    attendees,
    fetchEventUsers: () => dispatch(fetchEventUsers(code))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  AttendeesListContainer
);
