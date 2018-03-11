import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import EventDetails from '../EventDetails/EventDetails';
import EventLoginFormContainer from '../EventLoginForm/EventLoginFormContainer';
import EventControlsContainer from '../EventControls/EventControlsContainer';
import AttendeesListContainer from '../attendees/AttendeesList/AttendeesListContainer';
import NotificationsListContainer from '../notifications/NotificationsList/NotificationsListContainer';
import QuickLoginContainer from '../QuickLogin/QuickLoginContainer';
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
    {props.isLoggedIn && <NotificationsListContainer/>}
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