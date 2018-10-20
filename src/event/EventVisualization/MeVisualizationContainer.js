import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import { refreshEvent } from "../eventUserActions";
import { selectAttendee } from "./visualizationActions";
import { selectIsRefreshing } from "../activeEventSelectors";
import { getDistance } from "./VisualizationHelpers";
import BaseNode from "./BaseNode/BaseNode";

class MeVisualizationContainer extends Component {
  static propTypes = {
    ...AttendeePropTypes,
    boundingWidth: PropTypes.number.isRequired,
    boundingHeight: PropTypes.number.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    refreshEvent: PropTypes.func.isRequired,
    selectAttendee: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number.isRequired
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

  getDistance = () =>
    getDistance({
      ms: this.props.duration,
      zoom: this.props.zoomLevel
    });

  getCx = () => this.props.boundingWidth / 2;

  getCy = () => this.props.boundingHeight / 2 + this.getDistance();

  getR = () => 15;

  handleClick = () => {
    this.props.selectAttendee(this.props.userName);
    this.props.refreshEvent();
  };

  render() {
    return (
      <BaseNode
        cx={this.getCx()}
        cy={this.getCy()}
        r={this.getR()}
        fill="rgb(67,111,189)"
        text={this.props.userName.substring(0, 1)}
        textStroke="white"
        onClick={this.handleClick}
        ring={{
          r: this.getR() + 5,
          cx: this.getCx(),
          cy: this.getCy(),
          fill: "rgb(67,111,189)",
          animation: this.props.isRefreshing ? "pulse" : null
        }}
        orbitalRing={{
          r: this.getDistance(),
          cx: this.props.boundingWidth / 2,
          cy: this.props.boundingHeight / 2,
          fill: "rgb(67,111,189)"
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  isRefreshing: selectIsRefreshing(state)
});

const mapDispatchToProps = {
  refreshEvent,
  selectAttendee
};

export default connect(mapStateToProps, mapDispatchToProps)(
  MeVisualizationContainer
);
