import React, { Component } from "react";
import EventDetails from "./EventDetails";
import { connect } from "react-redux";
import {
  selectEventId,
  selectEventLocation,
  selectEventScheduledTime,
  selectNumEventAttendees
} from "../activeEventSelectors";
import { formatDate } from "../../helpers/moment";

class EventDetailsContainer extends Component {
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  state = {
    hasCopied: false,
    isTimeModalOpen: false
  };

  getScheduledTimeString = () => {
    if (!this.props.scheduledTime) {
      return 'Unscheduled';
    }

    return formatDate(this.props.scheduledTime, "hh:mm A");
  };

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
        {...this.props}
        scheduledTimeString={this.getScheduledTimeString()}
        showCopyClipboard={!!this.props.eventId && !this.state.hasCopied}
        showCopyCheck={!!this.props.eventId && this.state.hasCopied}
        onCopy={this.handleCopy}
        onTimeClick={this.handleTimeClick}
        isTimeModalOpen={this.state.isTimeModalOpen}
        onTimeModalClose={this.handleTimeModalClose}
      />
    );
  }
}

const mapStateToProps = state => ({
  eventId: selectEventId(state),
  location: selectEventLocation(state),
  numAttendees: selectNumEventAttendees(state),
  scheduledTime: selectEventScheduledTime(state)
});

export default connect(mapStateToProps)(EventDetailsContainer);
