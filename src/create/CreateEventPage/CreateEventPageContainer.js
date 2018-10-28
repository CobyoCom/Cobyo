import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent } from "../createEventActions";
import { selectCreateEventForm } from "../createEventFormSelectors";
import CreateEventPage from "./CreateEventPage";

class CreateEventPageContainer extends Component {
  state = {
    disabled: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ disabled: true });

    try {
      const code = await this.props.createEvent();
      this.props.history.push(`/${code}`);
    } catch (error) {
      this.setState({ disabled: false });
    }
  };

  render() {
    return (
      <CreateEventPage
        disabled={this.state.disabled}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  createEventForm: selectCreateEventForm(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  createEvent
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const {
    createEventForm: { placeId, ...event },
    ...restStateProps
  } = stateProps;
  const { dispatch, createEvent, ...restDispatchProps } = dispatchProps;
  return {
    ...ownProps,
    ...restStateProps,
    ...restDispatchProps,
    createEvent: () =>
      dispatch(
        createEvent({
          place: {
            googlePlaceId: placeId
          },
          ...event
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CreateEventPageContainer
);
