import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsLoggedIn } from '../activeEventSelectors';
import EventSettingCopyClipboard from './EventSettingCopyClipboard';
import EventSettingEditPlace from './EventSettingEditPlace';
import EventSettingEndEvent from './EventSettingEndEvent';
import EventSettings from './EventSettings';

class EventSettingsContainer extends Component {
  static propTypes = {
    showCopyUrlTab: PropTypes.bool.isRequired,
    showEditPlaceTab: PropTypes.bool.isRequired,
    showCloseEventTab: PropTypes.bool.isRequired
  };

  state = {
    isOpen: false
  };

  handleClick = () =>
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));

  handleOpen = () => this.setState({isOpen: true});

  handleClose = () => this.setState({isOpen: false});

  getTabs = () => {
    const tabs = [];

    if (this.props.showCopyUrlTab) {
      tabs.push(<EventSettingCopyClipboard onSuccess={this.handleClose} />);
    }

    if (this.props.showEditPlaceTab) {
      tabs.push(<EventSettingEditPlace/>);
    }

    if (this.props.showCloseEventTab) {
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
        onClose={this.handleClose}
        tabs={this.getTabs()}
      />
    );
  }
}

const mapStateToProps = state => ({
  showCopyUrlTab: true,
  showEditPlaceTab: selectIsLoggedIn(state),
  showCloseEventTab: selectIsLoggedIn(state)
});

export default connect(mapStateToProps)(EventSettingsContainer);
