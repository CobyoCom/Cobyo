import React from 'react';
import NavBar from '../../navigation/NavBar/NavBar';
import LoginFormContainer from '../../login/LoginForm/LoginFormContainer';
import './EventsPage.css';

const EventsPage = () => (
  <div className="EventsPage">
    <LoginFormContainer/>
    <NavBar activeTab="Events" />
  </div>
);

EventsPage.propTypes = {};

export default EventsPage;
