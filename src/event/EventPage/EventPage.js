import React from "react";
import PropTypes from "prop-types";
import BackToEventsButton from "../BackToEventsButton/BackToEventsButton";
import EventSettingsContainer from "../EventSettings/EventSettingsContainer";
import EventDetailsContainer from "../EventDetails/EventDetailsContainer";
import EventJoinForm from "../EventJoinForm/EventJoinForm";
import EventJoinButton from "../EventJoinButton/EventJoinButton";
import TravelModeSelectContainer from "../TravelModeSelect/TravelModeSelectContainer";
import AttendeesListContainer from "../attendees/AttendeesList/AttendeesListContainer";
import EventPageCarousel from "./EventPageCarousel";
import EventVisualization from "../EventVisualization/EventVisualization";
import EventMap from "../EventMap/EventMap";
import NavBar from "../../navigation/NavBar/NavBar";
import "./EventPage.css";

const EventPage = props => (
  <div className="EventPage">
    <BackToEventsButton />
    <EventSettingsContainer />
    <EventDetailsContainer />
    {props.shouldShowJoinButton && <EventJoinButton />}
    {props.shouldShowTravelModeSelect && <TravelModeSelectContainer />}
    {props.shouldShowLoginInput && <EventJoinForm />}
    {props.shouldShowCarousel && (
      <EventPageCarousel
        carouselItems={[
          {
            name: "Visualization",
            node: <EventVisualization />
          },
          {
            name: "Map",
            node: <EventMap />
          }
        ]}
      />
    )}
    {props.shouldShowAttendeesList && <AttendeesListContainer />}
    <NavBar activeTab="Events" />
  </div>
);

EventPage.propTypes = {
  shouldShowLoginInput: PropTypes.bool,
  shouldShowJoinButton: PropTypes.bool,
  shouldShowTravelModeSelect: PropTypes.bool,
  shouldShowAttendeesList: PropTypes.bool,
  shouldShowCarousel: PropTypes.bool
};

EventPage.defaultProps = {
  shouldShowLoginInput: false,
  shouldShowLoginModal: false,
  shouldShowTravelModeSelect: false,
  shouldShowAttendeesList: false,
  shouldShowCarousel: false
};

export default EventPage;
