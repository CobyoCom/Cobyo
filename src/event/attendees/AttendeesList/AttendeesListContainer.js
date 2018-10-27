import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeesList from "./AttendeesList";
import {
  selectActiveEventCode,
  selectActiveEventUsers
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

  componentDidMount() {
    this.props.fetchEventUsers();
  }

  handleModalClose = () => this.props.deselectAttendee();

  render() {
    return (
      <AttendeesList
        attendees={this.props.attendees}
        selectedAttendee={this.props.selectedAttendee}
        onModalClose={this.handleModalClose}
      />
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectActiveEventUsers(state),
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
