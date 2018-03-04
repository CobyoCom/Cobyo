import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import EventDetails from '../../event/EventDetails/EventDetails';
import EventLoginFormContainer from '../../event/EventLoginForm/EventLoginFormContainer';
import EventControlsContainer from '../../event/EventControls/EventControlsContainer';
import AttendeesListContainer from "../../event/Attendees/AttendeesListContainer";
import EventNotificationsContainer from "../../event/EventNotifications/EventNotificationsContainer";
import QuickLoginContainer from '../../event/QuickLogin/QuickLoginContainer';
import NavBar from '../../navigation/NavBar/NavBar';
import './EventPage.css';

const EventPage = props => (
  <div className="EventPage">
    <EventDetails/>
    {props.isEventLoaded && !props.isLoggedIn && <EventLoginFormContainer/>}
    {props.isEventLoaded && !props.isLoggedIn && !!props.localStorageLogin && (
      <Modal
        little
        open={props.isQuickLoginModalOpen}
        showCloseIcon={false}
        onClose={props.onCloseQuickLoginModal}
      >
        <QuickLoginContainer
          userName={props.localStorageLogin.userName}
          travelMode={props.localStorageLogin.travelMode}
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
  localStorageLogin: PropTypes.object,
  isQuickLoginModalOpen: PropTypes.bool.isRequired,
  onCloseQuickLoginModal: PropTypes.func.isRequired,
};

export default EventPage;