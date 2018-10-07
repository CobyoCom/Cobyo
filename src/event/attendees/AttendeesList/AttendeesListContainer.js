import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectEventAttendees,
  selectMe,
  selectSelectedAttendee
} from "../../activeEventSelectors";
import { refreshEvent } from "../../eventUserActions";
import { AttendeePropTypes } from "../AttendeesListItem/AttendeesListItem";
import { deselectAttendee } from "../../EventVisualization/visualizationActions";
import AttendeesList from "./AttendeesList";

class AttendeesListContainer extends Component {
  static propTypes = {
    me: PropTypes.shape(AttendeePropTypes).isRequired,
    attendees: PropTypes.array,
    refreshEvent: PropTypes.func.isRequired,
    selectedAttendee: PropTypes.object,
    deselectAttendee: PropTypes.func.isRequired
  };

  static defaultProps = {
    attendees: []
  };

  async componentDidMount() {
    try {
      await this.props.refreshEvent();
    } catch (error) {
      console.error("Loading attendees failed");
    }
  }

  handleModalClose = () => this.props.deselectAttendee();

  render() {
    return (
      <AttendeesList {...this.props} onModalClose={this.handleModalClose} />
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectEventAttendees(state),
  me: selectMe(state),
  selectedAttendee: selectSelectedAttendee(state)
});

const mapDispatchToProps = {
  refreshEvent,
  deselectAttendee
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendeesListContainer
);
