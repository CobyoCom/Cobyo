import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeTravelMode } from "../eventUserActions";
import TravelModeSelect from "./TravelModeSelect";
import Modal from "react-responsive-modal";
import { selectActiveEventCode } from "../activeEventSelectors";

class EventJoinTravelModeSelect extends Component {
  static propTypes = {
    changeTravelMode: PropTypes.func.isRequired
  };

  state = {
    shouldShowTravelModeSelect: true
  };

  handleClose = () => this.setState({ shouldShowTravelModeSelect: false });

  render() {
    return (
      <Modal
        open={this.state.shouldShowTravelModeSelect}
        center
        showCloseIcon={false}
        onClose={this.handleClose}
      >
        <TravelModeSelect onChange={this.props.changeTravelMode} />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  code: selectActiveEventCode(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  changeTravelMode
});

const mergeProps = (stateProps, dispatchProps) => {
  const { code } = stateProps;
  const { dispatch, changeTravelMode } = dispatchProps;
  return {
    changeTravelMode: travelMode =>
      dispatch(changeTravelMode({ code, travelMode }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  EventJoinTravelModeSelect
);
