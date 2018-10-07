import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectZoomLevel } from "../../activeEventSelectors";
import {
  incrementZoomLevel,
  decrementZoomLevel
} from "../visualizationActions";
import "./ZoomControls.css";

class ZoomControls extends Component {
  static propTypes = {
    zoomLevel: PropTypes.number.isRequired,
    incrementZoomLevel: PropTypes.func.isRequired,
    decrementZoomLevel: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="ZoomControls">
        <div
          className="ZoomControls-button"
          onClick={this.props.incrementZoomLevel}
        >
          <span>+</span>
        </div>
        <div
          className="ZoomControls-button"
          onClick={this.props.decrementZoomLevel}
        >
          <span>-</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  zoomLevel: selectZoomLevel(state)
});

const mapDispatchToProps = {
  incrementZoomLevel,
  decrementZoomLevel
};

export default connect(mapStateToProps, mapDispatchToProps)(ZoomControls);
