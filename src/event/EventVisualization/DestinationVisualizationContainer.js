import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  selectEventScheduledTime,
  selectIsRefreshing
} from "../activeEventSelectors_old";
import { getDistance } from "./VisualizationHelpers";
import { to } from "../../helpers/moment";
import BaseNode from "./BaseNode/BaseNode";

class DestinationVisualizationContainer extends Component {
  static propTypes = {
    boundingWidth: PropTypes.number.isRequired,
    boundingHeight: PropTypes.number.isRequired,
    scheduledTime: PropTypes.number,
    isRefreshing: PropTypes.bool.isRequired,
    zoomLevel: PropTypes.number.isRequired
  };

  getTimeDistanceInMs = () =>
    Math.max(0, this.props.scheduledTime - new Date().getTime());

  getR = () => 15;

  getRingR = () =>
    getDistance({ ms: this.getTimeDistanceInMs(), zoom: this.props.zoomLevel });

  getRingText = () => to(new Date(this.props.scheduledTime));

  getCx = () => this.props.boundingWidth / 2;

  getCy = () => this.props.boundingHeight / 2;

  getRingTextMaxY = () => this.getCy() - this.getR() - 8;

  getRingTextMinY = () => 15; // Ring text height is ~15

  getRingTextY = () => {
    const padding = 7;

    return Math.min(
      Math.max(
        this.getCy() - this.getRingR() - padding,
        this.getRingTextMinY()
      ),
      this.getRingTextMaxY()
    );
  };

  render() {
    return (
      <Fragment>
        <BaseNode
          cx={this.getCx()}
          cy={this.getCy()}
          r={this.getR()}
          fill="rgb(247, 204, 70)"
          ring={
            this.props.scheduledTime
              ? {
                  cx: this.props.boundingWidth / 2,
                  cy: this.props.boundingHeight / 2,
                  r: this.getRingR(),
                  text: this.getRingText(),
                  fill: "rgb(247, 204, 70)",
                  animation: this.props.isRefreshing ? "flash" : null,
                  hasMask: false // TODO: true
                }
              : null
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  scheduledTime: selectEventScheduledTime(state),
  isRefreshing: selectIsRefreshing(state)
});

export default connect(mapStateToProps)(DestinationVisualizationContainer);
