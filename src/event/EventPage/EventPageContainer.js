import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvent } from "../eventActions";
import { fetchMe } from "../../me/meActions";
import {
  selectActiveEventHasLoaded,
  selectActiveEventHasJoined,
  selectActiveEventMyTravelMode
} from "../activeEventSelectors";
import { selectHasLoggedIn, selectMeLoaded } from "../../me/meSelectors";
import { DRIVING, TRANSIT, WALKING } from "../../helpers/globalConstants";
import EventPage from "./EventPage";
import { selectShouldShowTravelModeSelect } from "../../reducers/ui/uiEventSelectors";

class EventPageContainer extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    hasLoggedIn: PropTypes.bool.isRequired,
    hasMeLoaded: PropTypes.bool.isRequired,
    hasEventLoaded: PropTypes.bool.isRequired,
    hasJoined: PropTypes.bool.isRequired,
    travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
    fetchEvent: PropTypes.func.isRequired,
    shouldShowTravelModeSelect: PropTypes.bool.isRequired
  };

  async componentDidMount() {
    if (!this.props.hasEventLoaded) {
      await this.props.fetchEvent(this.props.code);
    }
    if (!this.props.hasMeLoaded) {
      await this.props.fetchMe();
    }
  }

  getShouldShowLoginInput = () =>
    this.props.hasEventLoaded &&
    this.props.hasMeLoaded &&
    !this.props.hasJoined &&
    !this.props.hasLoggedIn;

  getShouldShowJoinButton = () =>
    this.props.hasEventLoaded &&
    !this.props.hasJoined &&
    this.props.hasLoggedIn;

  getShouldShowTravelModeSelect = () =>
    (this.props.hasEventLoaded &&
      this.props.hasJoined &&
      !this.props.travelMode) ||
    this.props.shouldShowTravelModeSelect;

  getShouldShowAttendeesList = () =>
    this.props.hasEventLoaded &&
    this.props.hasJoined &&
    !!this.props.travelMode;

  render() {
    return (
      <EventPage
        shouldShowLoginInput={this.getShouldShowLoginInput()}
        shouldShowJoinButton={this.getShouldShowJoinButton()}
        shouldShowTravelModeSelect={this.getShouldShowTravelModeSelect()}
        shouldShowAttendeesList={this.getShouldShowAttendeesList()}
      />
    );
  }
}

const mapStateToProps = state => ({
  hasLoggedIn: selectHasLoggedIn(state),
  hasEventLoaded: selectActiveEventHasLoaded(state),
  hasMeLoaded: selectMeLoaded(state),
  hasJoined: selectActiveEventHasJoined(state),
  travelMode: selectActiveEventMyTravelMode(state),
  shouldShowTravelModeSelect: selectShouldShowTravelModeSelect(state)
});

const mapDispatchToProps = {
  fetchEvent,
  fetchMe
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPageContainer);
