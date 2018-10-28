import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeesList from "./AttendeesList";
import {
  selectActiveEventAttendeesList,
  selectActiveEventMyUpdatedTime
} from "../../activeEventSelectors";
import { fetchEventUsers } from "../../eventActions";
import { refreshMe } from "../../eventUserActions";

const REFRESH_THRESHOLD_MS = 60 * 1000;
const CHECK_FOR_REFRESH_INTERVAL_MS = 5 * 1000;

class AttendeesListContainer extends Component {
  static propTypes = {
    attendees: PropTypes.array,
    updatedTime: PropTypes.number,
    selectedAttendee: PropTypes.object, // TODO: Implement
    deselectAttendee: PropTypes.func.isRequired,
    fetchEventUsers: PropTypes.func.isRequired,
    refreshMe: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: [],
    updatedTime: null,
    selectedAttendee: null,
    deselectAttendee() {}
  };

  state = {};

  componentDidMount() {
    this.props.fetchEventUsers();

    this.timer = setInterval(() => {
      if (this.getShouldRefresh()) {
        this.props.refreshMe();
      }
    }, CHECK_FOR_REFRESH_INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getShouldRefresh = () =>
    new Date().getTime() - this.props.updatedTime > REFRESH_THRESHOLD_MS;

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
  attendees: selectActiveEventAttendeesList(state),
  updatedTime: selectActiveEventMyUpdatedTime(state)
});

const mapDispatchToProps = {
  fetchEventUsers,
  refreshMe
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendeesListContainer
);
