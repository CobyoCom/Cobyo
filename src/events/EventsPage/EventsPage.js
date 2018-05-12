import React from 'react';
import PropTypes from 'prop-types'
import NavBar from '../../navigation/NavBar/NavBar';

const EventsPage = props => (
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