import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {selectActiveEventId, selectIsLoggedIn} from '../activeEventSelectors';
import EventSettingCopyClipboard from './EventSettingCopyClipboard';
import EventSettingEndEvent from './EventSettingEndEvent';
import EventSettingEditEvent from './EventSettingEditEvent';
import EventSettings from './EventSettings';

class EventSettingsContainer extends Component {
  static propTypes = {
    shouldShowCopyUrlTab: PropTypes.bool.isRequired,
    shouldShowEditEventTab: PropTypes.bool.isRequired,
    shouldShowCloseEventTab: PropTypes.bool.isRequired
  };

  static defaultProps = {
    shouldShowCopyUrlTab: true,
    shouldShowEditEventTab: false,
    shouldShowCloseEventTab: false
  };

  state = {
    isOpen: false
  };

  handleClick = () =>
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  getTabs = () => {
    const tabs = [];

    if (this.props.shouldShowCopyUrlTab) {
      tabs.push(<EventSettingCopyClipboard onSuccess={this.handleClick} />);
    }

    if (this.props.shouldShowEditEventTab) {
      tabs.push(<EventSettingEditEvent eventId={this.props.eventId} />);
    }

    if (this.props.shouldShowCloseEventTab) {
      tabs.push(
        <EventSettingEndEvent
          onSuccess={() => {
            window.location.assign('/');
          }}
        />
      );
    }

    return tabs;
  };

  render() {
    return (
      <EventSettings
        isOpen={this.state.isOpen}
        onClick={this.handleClick}
        onClose={this.handleClick}
        tabs={this.getTabs()}
      />
    );
  }
}

const mapStateToProps = state => ({
  eventId: selectActiveEventId(state),
  shouldShowEditEventTab: selectIsLoggedIn(state),
  shouldShowCloseEventTab: selectIsLoggedIn(state)
});

export default connect(mapStateToProps)(EventSettingsContainer);
