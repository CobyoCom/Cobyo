import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CreateEventPage from "./CreateEventPage";
import { editEvent } from "../createEventActions";
import { selectCreateEventForm } from "../createEventFormSelectors";

class EditEventPageContainer extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    editEvent: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const code = await this.props.editEvent();
      this.props.history.push(`/${code}`);
    } catch (error) {}
  };

  render() {
    return <CreateEventPage disabled={false} onSubmit={this.handleSubmit} />;
  }
}

const mapStateToProps = state => ({
  createEventForm: selectCreateEventForm(state)
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  editEvent
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { code } = ownProps;
  const { createEventForm } = stateProps;
  const { dispatch, editEvent } = dispatchProps;
  const { placeId, ...event } = createEventForm;
  return {
    ...ownProps,
    editEvent: () =>
      dispatch(
        editEvent({
          ...event,
          place: {
            googlePlaceId: placeId
          },
          code
        })
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  EditEventPageContainer
);
