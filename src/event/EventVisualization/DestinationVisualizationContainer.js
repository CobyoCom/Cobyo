import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DestinationVisualization from "./DestinationVisualization";
import TimeSelectModal from "../TimeSelect/TimeSelectModal";
import {
  selectEventScheduledTime,
  selectIsRefreshing
} from "../activeEventSelectors";
import { getDistance } from "./VisualizationHelpers";

class DestinationVisualizationContainer extends Component {
  static propTypes = {
    boundingHeight: PropTypes.number.isRequired,
    scheduledTime: PropTypes.number,
    isRefreshing: PropTypes.bool.isRequired
  };

  state = {
    isModalOpen: false
  };

  getTimeDistanceInMs = () =>
    Math.max(0, this.props.scheduledTime - new Date().getTime());

  getR = () => 30;

  getRingR = () => getDistance({ ms: this.getTimeDistanceInMs() });

  getText = () => {
    if (!this.props.scheduledTime) {
      return "+";
    }

    const date = new Date(this.props.scheduledTime);
    const hour =
      date.getHours() < 10
        ? `0${date.getHours().toString()}`
        : date.getHours().toString();
    const minute =
      date.getMinutes() < 10
        ? `0${date.getMinutes().toString()}`
        : date.getMinutes().toString();

    return `${hour}:${minute}`;
  };

  handleDestinationClick = () => this.setState({ isModalOpen: true });

  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    return (
      <Fragment>
        <DestinationVisualization
          cx="50%"
          cy="50%"
          r={this.getR()}
          fill="rgb(247, 204, 70)"
          onClick={this.handleDestinationClick}
          shouldShowRing={!!this.props.scheduledTime}
          ringR={this.getRingR()}
          shouldPulse={this.props.isRefreshing}
          text={this.getText()}
        />
        <TimeSelectModal
          isModalOpen={this.state.isModalOpen}
          onClose={this.handleModalClose}
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
