import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeeVisualization from "./AttendeeVisualization";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import { refreshEvent } from "../eventUserActions";
import { selectIsRefreshing } from "../activeEventSelectors";
import { getDistance } from "./VisualizationHelpers";

class MeVisualizationContainer extends Component {
  static propTypes = {
    ...AttendeePropTypes,
    boundingHeight: PropTypes.number.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    refreshEvent: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        "deviceorientation",
        this.deviceOrientationHandler,
        false
      );
    }
  }

  state = {
    alpha: 0
  };

  deviceOrientationHandler = e => {
    this.setState({ alpha: e.alpha });
  };

  getCy = () =>
    this.props.boundingHeight / 2 + getDistance({ ms: this.props.duration });

  getR = () => 15;

  handleClick = () => this.props.refreshEvent();

  render() {
    return (
      <AttendeeVisualization
        text={this.props.userName}
        textStroke="white"
        cx="50%"
        cy={this.getCy()}
        r={this.getR()}
        fill={"rgb(67,111,189)"}
        onClick={this.handleClick}
        shouldShowRing
        ringR={this.getR() + 5}
        shouldPulse={this.props.isRefreshing}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRefreshing: selectIsRefreshing(state)
});

const mapDispatchToProps = {
  refreshEvent
};

export default connect(mapStateToProps, mapDispatchToProps)(
  MeVisualizationContainer
);
