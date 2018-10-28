import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import { refreshMe } from "../eventUserActions";
import { selectAttendee } from "./visualizationActions";
import { selectIsCalculatingDuration } from "../../reducers/ui/uiEventSelectors";
import { getDistance } from "./VisualizationHelpers";
import BaseNode from "./BaseNode/BaseNode";
import { selectActiveEventCode } from "../activeEventSelectors";

class MeVisualizationContainer extends Component {
  static propTypes = {
    ...AttendeePropTypes,
    boundingWidth: PropTypes.number.isRequired,
    boundingHeight: PropTypes.number.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    zoomLevel: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
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

  render() {
    return (
      <BaseNode
        cx={this.getCx()}
        cy={this.getCy()}
        r={this.getR()}
        fill="rgb(67,111,189)"
        text={this.props.user.name.substring(0, 1)}
        textStroke="white"
        onClick={this.props.onClick}
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
  code: selectActiveEventCode(state),
  isRefreshing: selectIsCalculatingDuration(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  refreshMe,
  selectAttendee
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { code, ...restStateProps } = stateProps;
  const { dispatch, refreshMe, ...restDispatchProps } = dispatchProps;
  const { travelMode, user: { name } } = ownProps;
  return {
    ...ownProps,
    ...restStateProps,
    ...restDispatchProps,
    onClick: () => {
      dispatch(selectAttendee(name));
      dispatch(refreshMe({ code, travelMode }));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  MeVisualizationContainer
);
