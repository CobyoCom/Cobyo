import React from 'react';
import NavBar from '../../navigation/NavBar/NavBar';

const EventsPage = () => (
  <div>
    <div style={{
      padding: '50px 0',
      textAlign: 'center'
    }}>
      Sign up to see your events here!
    </div>
    <NavBar activeTab="Events"/>
  </div>
);

EventsPage.propTypes = {

};

export default EventsPage;