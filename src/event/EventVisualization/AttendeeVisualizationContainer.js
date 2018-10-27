import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import { getDistance } from "./VisualizationHelpers";
import { selectAttendee } from "./visualizationActions";
import BaseNode from "./BaseNode/BaseNode";

const DEGREES_TO_RADIANS = 0.0174533;

class AttendeeVisualizationContainer extends Component {
  static propTypes = {
    ...AttendeePropTypes,
    boundingWidth: PropTypes.number.isRequired,
    boundingHeight: PropTypes.number.isRequired,
    zoomLevel: PropTypes.number.isRequired
  };

  state = {
    alpha: Math.floor(Math.random() * 270 + 45)
  };

  getDistance = () =>
    getDistance({ ms: this.props.duration, zoom: this.props.zoomLevel });

  _isQuadrantOne = () => this.state.alpha < 90 && this.state.alpha >= 0;

  _isQuadrantTwo = () => this.state.alpha < 180 && this.state.alpha >= 90;

  _isQuadrantThree = () => this.state.alpha < 270 && this.state.alpha >= 180;

  _isQuadrantFour = () => this.state.alpha < 360 && this.state.alpha >= 270;

  getCx = () => {
    if (this._isQuadrantOne()) {
      const angleDelta = this.state.alpha;
      return (
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance() +
        this.props.boundingWidth / 2
      );
    } else if (this._isQuadrantTwo()) {
      const angleDelta = 180 - this.state.alpha;
      return (
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance() +
        this.props.boundingWidth / 2
      );
    } else if (this._isQuadrantThree()) {
      const angleDelta = this.state.alpha - 180;
      return (
        this.props.boundingWidth / 2 -
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()
      );
    } else if (this._isQuadrantFour()) {
      const angleDelta = 360 - this.state.alpha;
      return (
        this.props.boundingWidth / 2 -
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()
      );
    } else {
      return this.props.boundingWidth / 2;
    }
  };

  getCy = () => {
    if (this._isQuadrantOne()) {
      const angleDelta = this.state.alpha;
      return (
        Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance() +
        this.props.boundingHeight / 2
      );
    } else if (this._isQuadrantTwo()) {
      const angleDelta = 180 - this.state.alpha;
      return (
        this.props.boundingHeight / 2 -
        Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()
      );
    } else if (this._isQuadrantThree()) {
      const angleDelta = this.state.alpha - 180;
      return (
        this.props.boundingHeight / 2 -
        Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()
      );
    } else if (this._isQuadrantFour()) {
      const angleDelta = 360 - this.state.alpha;
      return (
        Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance() +
        this.props.boundingHeight / 2
      );
    } else {
      return this.props.boundingHeight / 2;
    }
  };

  getR = () => 15;

  handleClick = () => this.props.selectAttendee(this.props.user.name);

  render() {
    return (
      <BaseNode
        cx={this.getCx()}
        cy={this.getCy()}
        r={this.getR()}
        fill="rgb(67,111,189)"
        text={this.props.user.name.substring(0, 1)}
        textStroke="white"
        onClick={this.handleClick}
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

const mapDispatchToProps = {
  selectAttendee
};

export default connect(null, mapDispatchToProps)(
  AttendeeVisualizationContainer
);
