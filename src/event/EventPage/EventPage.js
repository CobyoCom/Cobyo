import React from 'react';
import PropTypes from 'prop-types';
import BackToEventsButton from '../BackToEventsButton/BackToEventsButton';
import EventSettingsContainer from '../EventSettings/EventSettingsContainer';
import EventDetailsContainer from '../EventDetails/EventDetailsContainer';
import EventLoginFormContainer from '../EventLoginForm/EventLoginFormContainer';
import AttendeesListContainer from '../attendees/AttendeesList/AttendeesListContainer';
import NotificationsListContainer from '../notifications/NotificationsList/NotificationsListContainer';
import QuickLoginModal from '../QuickLogin/QuickLoginModal';
import EventMap from '../EventMap/EventMap';
import NavBar from '../../navigation/NavBar/NavBar';
import EventVisualizationContainer from '../EventVisualization/EventVisualizationContainer';
import './EventPage.css';

const EventPage = props => (
  <div className="EventPage">
    <BackToEventsButton/>
    <EventSettingsContainer />
    <EventDetailsContainer />
    {props.showEventEnded && (
      <h2 className="EventPage-hasEnded">This event has ended.</h2>
    )}
    {props.showLogin && <EventLoginFormContainer />}
    {props.showQuickLogin && (
      <QuickLoginModal
        isOpen={props.isQuickLoginModalOpen}
        onClose={props.onCloseQuickLoginModal}
        userName={props.localStorageLogin.userName}
        travelMode={props.localStorageLogin.travelMode}
      />
    )}
    {props.showEventMap && props.eventId === '1' && <EventVisualizationContainer />}
    {props.showEventMap && props.eventId !== '1' &&  <EventMap />}
    {props.showAttendeesList && <AttendeesListContainer />}
    {props.showNotifications && <NotificationsListContainer />}
    <NavBar activeTab="Events" />
  </div>
);

EventPage.propTypes = {
  eventId: PropTypes.string.isRequired,
  photoReference: PropTypes.string,
  showLogin: PropTypes.bool.isRequired,
  showQuickLogin: PropTypes.bool.isRequired,
  showEventMap: PropTypes.bool.isRequired,
  showAttendeesList: PropTypes.bool.isRequired,
  showNotifications: PropTypes.bool.isRequired,
  showEventEnded: PropTypes.bool.isRequired,
  localStorageLogin: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    travelMode: PropTypes.string
  }),
  isQuickLoginModalOpen: PropTypes.bool.isRequired,
  onCloseQuickLoginModal: PropTypes.func.isRequired
};

export default EventPage;
