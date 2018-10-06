import React, {Component} from 'react';
import AttendeeVisualization from './AttendeeVisualization';
import {AttendeePropTypes} from '../attendees/AttendeesListItem/AttendeesListItem';

const DEGREES_TO_RADIANS = .0174533;

class AttendeeVisualizationContainer extends Component {

  static propTypes = {
    ...AttendeePropTypes
  };

  state = {
    alpha: Math.floor((Math.random() * 270) + 45)
  };

  shouldComponentUpdate(nextProps) {
    return this.props.duration !== nextProps.duration;
  }

  // TODO: Fix
  getDistance = () => Math.min(40, Math.max(15, (this.props.duration / (3600 * 1000)) * 40));

  _isQuadrantOne = () => this.state.alpha < 90 && this.state.alpha >= 0;

  _isQuadrantTwo = () =>  this.state.alpha < 180 && this.state.alpha >= 90;

  _isQuadrantThree = () => this.state.alpha < 270 && this.state.alpha >= 180;

  _isQuadrantFour = () => this.state.alpha < 360 && this.state.alpha >= 270;

  getCx = () => {
    if (this._isQuadrantOne()) {
      const angleDelta = this.state.alpha;
      return (Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()) + 50;
    } else if (this._isQuadrantTwo()) {
      const angleDelta = 180 - this.state.alpha;
      return (Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()) + 50;
    } else if (this._isQuadrantThree()) {
      const angleDelta = this.state.alpha - 180;
      return 50 - (Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance())
    } else if (this._isQuadrantFour()) {
      const angleDelta = 360 - this.state.alpha;
      return 50 - (Math.sin(angleDelta * DEGREES_TO_RADIANS) * this.getDistance());
    } else {
      return 50;
    }
  };

  getCy = () => {
    if (this._isQuadrantOne()) {
      const angleDelta = this.state.alpha;
      return (Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()) + 50;
    } else if (this._isQuadrantTwo()) {
      const angleDelta = 180 - this.state.alpha;
      return 50 - (Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance());
    } else if (this._isQuadrantThree()) {
      const angleDelta = this.state.alpha - 180;
      return 50 - (Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance())
    } else if (this._isQuadrantFour()) {
      const angleDelta = 360 - this.state.alpha;
      return (Math.cos(angleDelta * DEGREES_TO_RADIANS) * this.getDistance()) + 50;
    } else {
      return 50;
    }
  };

  getR = () => 15;

  render() {
    return (
      <AttendeeVisualization
        text={this.props.userName}
        textStroke="white"
        cx={`${this.getCx()}%`}
        cy={`${this.getCy()}%`}
        r={this.getR()}
        fill={"rgb(67,111,189)"}
      />
    );
  }
}

export default AttendeeVisualizationContainer;