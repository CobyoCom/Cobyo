import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  refreshEvent,
  leaveForEvent
} from '../eventActions';
import {selectHasLeft} from '../activeEventSelectors';
import EventControls from './EventControls';

class EventControlsContainer extends Component {

  static propTypes = {
    hasLeft: PropTypes.bool.isRequired,
    refreshEvent: PropTypes.func.isRequired,
    leaveForEvent: PropTypes.func.isRequired
  };

  state = {
    isDisabledRefresh: false
  };

  handleClickRefresh = async () => {
    this.setState({isDisabledRefresh: true});
    try {
      await this.props.refreshEvent();
    } catch(error) {
      console.warn('Something failed in refresh');
    }
    this.setState({isDisabledRefresh: false});
  };

  handleClickCancel = () => {
    console.warn('TODO: cancel leaving');
  };

  handleClickGo = () => {
    this.props.leaveForEvent();
  };

  render() {
    return (
      <EventControls
        {...this.state}
        hasLeft={this.props.hasLeft}
        onClickRefresh={this.handleClickRefresh}
        onClickCancel={this.handleClickCancel}
        onClickGo={this.handleClickGo}
      />
    );
  }
}

const mapStateToProps = state => ({
  hasLeft: selectHasLeft(state)
});

const mapDispatchToProps = {
  refreshEvent,
  leaveForEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventControlsContainer)
