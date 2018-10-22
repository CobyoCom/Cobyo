import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvent } from "../eventActions";
import { fetchMe } from "../../me/meActions";
import { changeTravelMode } from "../eventUserActions";
import {
  selectActiveEventHasLoaded,
  selectActiveEventHasJoined,
  selectActiveEventMyTravelMode
} from "../activeEventSelectors";
import { selectHasLoggedIn, selectMeLoaded } from "../../me/meSelectors";
import { DRIVING, TRANSIT, WALKING } from "../../helpers/globalConstants";
import EventPage from "./EventPage";

class EventPageContainer extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    hasLoggedIn: PropTypes.bool.isRequired,
    hasMeLoaded: PropTypes.bool.isRequired,
    hasEventLoaded: PropTypes.bool.isRequired,
    hasJoined: PropTypes.bool.isRequired,
    travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
    fetchEvent: PropTypes.func.isRequired,
    changeTravelMode: PropTypes.func.isRequired
  };

  async componentDidMount() {
    await this.props.fetchEvent(this.props.code);
    await this.props.fetchMe();
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
    this.props.hasEventLoaded && this.props.hasJoined && !this.props.travelMode;

  render() {
    return (
      <EventPage
        shouldShowLoginInput={this.getShouldShowLoginInput()}
        shouldShowJoinButton={this.getShouldShowJoinButton()}
        shouldShowTravelModeSelect={this.getShouldShowTravelModeSelect()}
      />
    );
  }
}

const mapStateToProps = state => ({
  hasLoggedIn: selectHasLoggedIn(state),
  hasEventLoaded: selectActiveEventHasLoaded(state),
  hasMeLoaded: selectMeLoaded(state),
  hasJoined: selectActiveEventHasJoined(state),
  travelMode: selectActiveEventMyTravelMode(state)
});

const mapDispatchToProps = {
  fetchEvent,
  fetchMe,
  changeTravelMode
};

export default connect(mapStateToProps, mapDispatchToProps)(EventPageContainer);
