import React, { Component } from "react";
import { connect } from "react-redux";
import { createEvent } from "../createEventActions";
import CreateEventPage from "./CreateEventPage";
import { selectCreateEventForm } from "../createEventFormSelectors";

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
  const { createEventForm } = stateProps;
  const { dispatch, createEvent } = dispatchProps;
  const { placeId, ...event } = createEventForm;
  return {
    ...ownProps,
    createEvent: () =>
      dispatch(
        createEvent({
          ...event,
          place: {
            googlePlaceId: placeId
          }
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  CreateEventPageContainer
);
