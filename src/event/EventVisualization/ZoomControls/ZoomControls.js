import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  incrementZoomLevel,
  decrementZoomLevel
} from "../visualizationActions";
import "./ZoomControls.css";

class ZoomControls extends Component {
  static propTypes = {
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

const mapDispatchToProps = {
  incrementZoomLevel,
  decrementZoomLevel
};

export default connect(null, mapDispatchToProps)(ZoomControls);
