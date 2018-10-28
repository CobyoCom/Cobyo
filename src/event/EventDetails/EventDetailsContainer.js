import React, { Component } from "react";
import PropTypes from "prop-types";
import EventDetails from "./EventDetails";
import { connect } from "react-redux";
import {
  selectActiveEventCode,
  selectActiveEventName,
  selectActiveEventEndedTime,
  selectActiveEventScheduledTime,
  selectActiveEventNumAttendees
} from "../activeEventSelectors";
import { formatDate } from "../../helpers/moment";

const TIME_FORMAT = "hh:mm A";

class EventDetailsContainer extends Component {
  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    numAttendees: PropTypes.number,
    scheduledTime: PropTypes.string
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  state = {
    hasCopied: false,
    isTimeModalOpen: false
  };

  getScheduledTimeString = () => {
    if (!this.props.scheduledTime) {
      return "Unscheduled";
    }

    return formatDate(this.props.scheduledTime, TIME_FORMAT);
  };

  getEndedTimeString = () =>
    this.props.endedTime ? formatDate(this.props.endedTime, TIME_FORMAT) : null;

  handleCopy = () => {
    this.setState({ hasCopied: true }, () => {
      this.timeout = setTimeout(() => {
        this.setState({ hasCopied: false });
      }, 5000);
    });
  };

  handleTimeClick = () => this.setState({ isTimeModalOpen: true });

  handleTimeModalClose = () => this.setState({ isTimeModalOpen: false });

  render() {
    return (
      <EventDetails
        name={this.props.name}
        numAttendees={this.props.numAttendees}
        endedTimeString={this.getEndedTimeString()}
        scheduledTimeString={this.getScheduledTimeString()}
        showCopyClipboard={!!this.props.code && !this.state.hasCopied}
        showCopyCheck={!!this.props.code && this.state.hasCopied}
        onCopy={this.handleCopy}
        onTimeClick={this.handleTimeClick}
        isTimeModalOpen={this.state.isTimeModalOpen}
        onTimeModalClose={this.handleTimeModalClose}
      />
    );
  }
}

const mapStateToProps = state => ({
  code: selectActiveEventCode(state),
  name: selectActiveEventName(state),
  numAttendees: selectActiveEventNumAttendees(state),
  endedTime: selectActiveEventEndedTime(state),
  scheduledTime: selectActiveEventScheduledTime(state)
});

export default connect(mapStateToProps)(EventDetailsContainer);
