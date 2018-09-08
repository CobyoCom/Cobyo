import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refreshEvent, leaveForEvent } from '../eventUserActions';
import { selectHasLeft, selectIsRefreshing } from '../activeEventSelectors';
import EventControls from './EventControls';

class EventControlsContainer extends Component {
  static propTypes = {
    hasLeft: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    refreshEvent: PropTypes.func.isRequired,
    leaveForEvent: PropTypes.func.isRequired
  };

  handleClickRefresh = async () => {
    try {
      await this.props.refreshEvent();
    } catch (error) {
      console.warn('Something failed in refresh');
    }
  };

  handleClickCancel = () => {
    this.props.leaveForEvent(false);
  };

  handleClickGo = () => {
    this.props.leaveForEvent();
  };

  render() {
    return (
      <EventControls
        hasLeft={this.props.hasLeft}
        isRefreshing={this.props.isRefreshing}
        onClickRefresh={this.handleClickRefresh}
        onClickCancel={this.handleClickCancel}
        onClickGo={this.handleClickGo}
      />
    );
  }
}

const mapStateToProps = state => ({
  hasLeft: selectHasLeft(state),
  isRefreshing: selectIsRefreshing(state)
});

const mapDispatchToProps = {
  refreshEvent,
  leaveForEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(
  EventControlsContainer
);
