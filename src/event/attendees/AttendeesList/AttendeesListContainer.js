import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeesList from "./AttendeesList";
import { selectActiveEventAttendeesList } from "../../activeEventSelectors";
import { fetchEventUsers } from "../../eventActions";
import { refreshMe } from "../../eventUserActions";

const REFRESH_THRESHOLD_MS = 10 * 1000;
const CHECK_FOR_REFRESH_INTERVAL_MS = 5 * 1000;

class AttendeesListContainer extends Component {
  static propTypes = {
    attendees: PropTypes.array,
    selectedAttendee: PropTypes.object, // TODO: Implement
    deselectAttendee: PropTypes.func.isRequired,
    fetchEventUsers: PropTypes.func.isRequired,
    refreshMe: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: [],
    selectedAttendee: null,
    deselectAttendee() {}
  };

  state = {
    startTimerTime: null
  };

  async componentDidMount() {
    await this.props.fetchEventUsers();
    this.setState({ startTimerTime: new Date().getTime() });
    this.timer = setInterval(this.refresh, CHECK_FOR_REFRESH_INTERVAL_MS);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  refresh = async () => {
    if (
      new Date().getTime() - this.state.startTimerTime <
      REFRESH_THRESHOLD_MS
    ) {
      return;
    }

    await this.props.refreshMe();
    this.setState({ startTimerTime: new Date().getTime() });
  };

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
  attendees: selectActiveEventAttendeesList(state)
});

const mapDispatchToProps = {
  fetchEventUsers,
  refreshMe
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendeesListContainer
);
