import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DestinationVisualization from "./DestinationVisualization";
import TimeSelectModal from "../TimeSelect/TimeSelectModal";
import {
  selectEventScheduledTime,
  selectIsRefreshing,
  selectZoomLevel
} from "../activeEventSelectors";
import { getDistance } from "./VisualizationHelpers";
import { to, formatDate } from "../../helpers/moment";

class DestinationVisualizationContainer extends Component {
  static propTypes = {
    boundingHeight: PropTypes.number.isRequired,
    scheduledTime: PropTypes.number,
    isRefreshing: PropTypes.bool.isRequired,
    zoomLevel: PropTypes.number.isRequired
  };

  state = {
    isModalOpen: false
  };

  getTimeDistanceInMs = () =>
    Math.max(0, this.props.scheduledTime - new Date().getTime());

  getR = () => 30;

  getRingR = () =>
    getDistance({ ms: this.getTimeDistanceInMs(), zoom: this.props.zoomLevel });

  getRingText = () => to(new Date(this.props.scheduledTime));

  getText = () => {
    if (!this.props.scheduledTime) {
      return "+";
    }

    return formatDate(this.props.scheduledTime, 'hh:mm');
  };

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

  handleDestinationClick = () => this.setState({ isModalOpen: true });

  handleModalClose = () => this.setState({ isModalOpen: false });

  render() {
    return (
      <Fragment>
        <DestinationVisualization
          cx="50%"
          cy={this.getCy()}
          r={this.getR()}
          fill="rgb(247, 204, 70)"
          onClick={this.handleDestinationClick}
          shouldShowRing={!!this.props.scheduledTime}
          ringR={this.getRingR()}
          ringText={this.getRingText()}
          ringTextY={this.getRingTextY()}
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
  isRefreshing: selectIsRefreshing(state),
  zoomLevel: selectZoomLevel(state)
});

export default connect(mapStateToProps)(DestinationVisualizationContainer);
