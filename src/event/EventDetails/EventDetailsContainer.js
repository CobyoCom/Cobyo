import React, {Component} from 'react';
import EventDetails from './EventDetails';
import {connect} from 'react-redux';
import {
  selectEventId,
  selectEventLocation,
  selectEventTime,
  selectNumEventAttendees
} from '../activeEventSelectors';

class EventDetailsContainer extends Component {

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  state = {
    hasCopied: false
  };

  handleCopy = () => {
    const dummy = document.createElement('input');
    document.body.appendChild(dummy);
    dummy.value = window.location.href;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.setState({hasCopied: true}, () => {
      this.timeout = setTimeout(() => {
        this.setState({hasCopied: false});
      }, 5000);
    });
  };

  render() {
    return (
      <EventDetails
        {...this.props}
        showCopyClipboard={this.props.eventId && !this.state.hasCopied}
        showCopyCheck={this.props.eventId && this.state.hasCopied}
        onCopy={this.handleCopy}
      />
    );
  }
}

const mapStateToProps = state => ({
  eventId: selectEventId(state),
  dateTime: selectEventTime(state),
  location: selectEventLocation(state),
  numAttendees: selectNumEventAttendees(state)
});

export default connect(
  mapStateToProps
)(EventDetailsContainer);