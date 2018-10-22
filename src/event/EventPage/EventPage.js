import React from "react";
import PropTypes from "prop-types";
import BackToEventsButton from "../BackToEventsButton/BackToEventsButton";
import EventSettingsContainer from "../EventSettings/EventSettingsContainer";
import EventDetailsContainer from "../EventDetails/EventDetailsContainer";
import EventJoinForm from "../EventJoinForm/EventJoinForm";
import EventJoinButton from "../EventJoinButton/EventJoinButton";
import EventJoinTravelModeSelect from "../TravelModeSelect/EventJoinTravelModeSelect";
import "./EventPage.css";

const EventPage = props => (
  <div className="EventPage">
    <BackToEventsButton />
    <EventSettingsContainer />
    <EventDetailsContainer />
    {props.shouldShowJoinButton && <EventJoinButton />}
    {props.shouldShowTravelModeSelect && <EventJoinTravelModeSelect />}
    {props.shouldShowLoginInput && <EventJoinForm />}
  </div>
);

EventPage.propTypes = {
  shouldShowLoginInput: PropTypes.bool,
  shouldShowJoinButton: PropTypes.bool,
  shouldShowTravelModeSelect: PropTypes.bool
};

EventPage.defaultProps = {
  shouldShowLoginInput: false,
  shouldShowLoginModal: false,
  shouldShowTravelModeSelect: false
};

export default EventPage;
