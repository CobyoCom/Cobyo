import React from 'react';
import PropTypes from 'prop-types';
import EventDetails from '../EventDetails/EventDetails';
import EventLoginFormContainer from '../EventLoginForm/EventLoginFormContainer';
import AttendeesListContainer from '../attendees/AttendeesList/AttendeesListContainer';
import NotificationsListContainer from '../notifications/NotificationsList/NotificationsListContainer';
import QuickLoginModal from '../QuickLogin/QuickLoginModal';
import EventMap from '../EventMap/EventMap';
import NavBar from '../../navigation/NavBar/NavBar';
import './EventPage.css';

const EventPage = props => (
  <div className="EventPage">
    <EventDetails/>
    {props.isEventLoaded && !props.isLoggedIn && <EventLoginFormContainer/>}
    {props.isEventLoaded && !props.isLoggedIn && !!props.localStorageLogin && (
      <QuickLoginModal
        isOpen={props.isQuickLoginModalOpen}
        onClose={props.onCloseQuickLoginModal}
        userName={props.localStorageLogin.userName}
        travelMode={props.localStorageLogin.travelMode}
      />
    )}
    {props.isLoggedIn && <EventMap/>}
    {props.isLoggedIn && <AttendeesListContainer/>}
    {props.isLoggedIn && <NotificationsListContainer/>}
    <NavBar activeTab="Events"/>
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