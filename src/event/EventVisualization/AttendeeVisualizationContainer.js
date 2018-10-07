import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AttendeeVisualization from "./AttendeeVisualization";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import { getDistance } from "./VisualizationHelpers";
import { selectZoomLevel } from "../activeEventSelectors";
import { selectAttendee } from "./visualizationActions";

const DEGREES_TO_RADIANS = 0.0174533;

class AttendeeVisualizationContainer extends Component {
  static propTypes = {
    ...AttendeePropTypes,
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
        this.props.boundingHeight / 2
      );
    } else if (this._isQuadrantTwo()) {
      const angleDelta = 180 - this.state.alpha;
      return (
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance() +
        this.props.boundingHeight / 2
      );
    } else if (this._isQuadrantThree()) {
      const angleDelta = this.state.alpha - 180;
      return (
        this.props.boundingHeight / 2 -
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()
      );
    } else if (this._isQuadrantFour()) {
      const angleDelta = 360 - this.state.alpha;
      return (
        this.props.boundingHeight / 2 -
        Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()
      );
    } else {
      return this.props.boundingHeight / 2;
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

  handleClick = () => this.props.selectAttendee(this.props.userName);

  render() {
    return (
      <AttendeeVisualization
        text={this.props.userName}
        textStroke="white"
        cx={this.getCx()}
        cy={this.getCy()}
        r={this.getR()}
        fill={"rgb(67,111,189)"}
        onClick={this.handleClick}
      />
    );
  }
}

const mapStateToProps = state => ({
  zoomLevel: selectZoomLevel(state)
});

const mapDispatchToProps = {
  selectAttendee
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AttendeeVisualizationContainer
);
