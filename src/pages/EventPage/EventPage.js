import React from 'react';
import PropTypes from 'prop-types';
import EventDetails from '../../event/EventDetails/EventDetails';
import EventLoginFormContainer from '../../event/EventLoginForm/EventLoginFormContainer';
import EventControlsContainer from '../../event/EventControls/EventControlsContainer';
import AttendeesListContainer from "../../event/AttendeesList/AttendeesListContainer";
import NavBar from '../../navigation/NavBar/NavBar';

const EventPage = props => (
  <div className="EventPage">
    <EventDetails/>
    {props.isEventLoaded && !props.isLoggedIn && <EventLoginFormContainer/>}
    {props.isLoggedIn && <EventControlsContainer/>}
    {props.isLoggedIn && <AttendeesListContainer/>}
    <NavBar/>
  </div>
);

EventPage.propTypes = {
  isEventLoaded: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

export default EventPage;