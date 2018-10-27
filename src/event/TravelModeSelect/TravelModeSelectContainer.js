import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  changeTravelMode,
  toggleShowTravelModeSelect
} from "../eventUserActions";
import TravelModeSelect from "./TravelModeSelect";
import Modal from "react-responsive-modal";
import { selectActiveEventCode } from "../activeEventSelectors";

class TravelModeSelectContainer extends Component {
  static propTypes = {
    changeTravelMode: PropTypes.func.isRequired,
    toggleShowTravelModeSelect: PropTypes.func.isRequired
  };

  state = {
    isLoading: false
  };

  handleClose = () => this.props.toggleShowTravelModeSelect(false);

  handleChange = travelMode => {
    this.setState({ isLoading: true });
    this.props.changeTravelMode(travelMode);
  };

  render() {
    return (
      <Modal
        open
        center
        showCloseIcon={false}
        onClose={this.handleClose}
        closeOnOverlayClick
      >
        <TravelModeSelect
          onChange={this.handleChange}
          isLoading={this.state.isLoading}
        />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  code: selectActiveEventCode(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  changeTravelMode,
  toggleShowTravelModeSelect
});

const mergeProps = (stateProps, dispatchProps) => {
  const { code } = stateProps;
  const { dispatch, changeTravelMode } = dispatchProps;
  return {
    toggleShowTravelModeSelect: payload =>
      dispatch(toggleShowTravelModeSelect(payload)),
    changeTravelMode: travelMode =>
      dispatch(changeTravelMode({ code, travelMode }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  TravelModeSelectContainer
);
