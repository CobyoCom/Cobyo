import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectActiveEventCode } from "../activeEventSelectors";
import { selectMyName } from "../../me/meSelectors";
import { joinEvent } from "../eventActions";
import Button from "../../components/Button/Button";

const EventJoinButton = props => (
  <Button autoFocus onClick={props.onClick}>
    {`Join as ${props.name}`}
  </Button>
);

EventJoinButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  code: selectActiveEventCode(state),
  name: selectMyName(state)
});

const mapDispatchToProps = dispatch => ({
  joinEvent,
  dispatch
});

const mergeProps = (stateProps, dispatchProps) => {
  const { name, code } = stateProps;
  const { dispatch, joinEvent } = dispatchProps;
  return {
    name,
    onClick: () => dispatch(joinEvent(code))
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  EventJoinButton
);
