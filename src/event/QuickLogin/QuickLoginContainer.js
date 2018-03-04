import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectEventId} from '../activeEventSelectors';
import {loginEvent} from '../eventActions';
import QuickLogin from "./QuickLogin";

class QuickLoginContainer extends Component {

  static propTypes = {
    eventId: PropTypes.number.isRequired,
    userName: PropTypes.string.isRequired,
    travelMode: PropTypes.string,
    loginEvent: PropTypes.func.isRequired
  };

  handleChangeTravelMode = (travelMode) => this.props.loginEvent(this.props.eventId, this.props.userName, travelMode);

  handleSubmit = () => this.props.loginEvent(this.props.eventId, this.props.userName, this.props.travelMode);

  render() {
    return (
      <QuickLogin
        eventId={this.props.eventId}
        userName={this.props.userName}
        showTravelModeSelect={!this.props.travelMode}
        onChangeTravelMode={this.handleChangeTravelMode}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  eventId: selectEventId(state)
});

const mapDispatchToProps = {
  loginEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuickLoginContainer);