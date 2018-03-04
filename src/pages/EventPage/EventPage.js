import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import EventDetails from '../../event/EventDetails/EventDetails';
import EventLoginFormContainer from '../../event/EventLoginForm/EventLoginFormContainer';
import EventControlsContainer from '../../event/EventControls/EventControlsContainer';
import AttendeesListContainer from "../../event/Attendees/AttendeesListContainer";
import EventNotificationsContainer from "../../event/EventNotifications/EventNotificationsContainer";
import QuickLogin from '../../event/QuickLogin/QuickLogin';
import NavBar from '../../navigation/NavBar/NavBar';
import './EventPage.css';

const EventPage = props => (
  <div className="EventPage">
    <EventDetails/>
    {props.isEventLoaded && !props.isLoggedIn && <EventLoginFormContainer/>}
    {props.isEventLoaded && !props.isLoggedIn && !!props.localStorageEvent && (
      <Modal
        little
        open={props.isQuickLoginModalOpen}
        showCloseIcon={false}
        onClose={props.onCloseQuickLoginModal}
      >
        <QuickLogin
          eventId={props.eventId}
          localStorageEvent={props.localStorageEvent}
          loginEvent={props.loginEvent}
        />
      </Modal>
    )}
    {props.isLoggedIn && <EventControlsContainer/>}
    {props.isLoggedIn && <AttendeesListContainer/>}
    {props.isLoggedIn && <EventNotificationsContainer/>}
    <NavBar/>
  </div>
);

EventPage.propTypes = {
  eventId: PropTypes.number.isRequired,
  isEventLoaded: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  localStorageEvent: PropTypes.object,
  isQuickLoginModalOpen: PropTypes.bool.isRequired,
  onCloseQuickLoginModal: PropTypes.func.isRequired,
  loginEvent: PropTypes.func.isRequired
};

EventPage.defaultProps = {
  localStorageUserName: null
};

export default EventPage;