import React  from 'react';
import PropTypes from 'prop-types';
import EventCodeFormContainer from '../EventCodeForm/EventCodeFormContainer';
import RecentEventsContainer from '../RecentEvents/RecentEventsContainer';
import NavBar from '../../navigation/NavBar/NavBar';
import Header from '../../header/Header';
import PlacesAutocompleteContainer from '../../create/PlacesAutocomplete/PlacesAutocompleteContainer';
import './HomePage.css';

const HomePage = props => (
  <div className="HomePage">
    <Header>
      <PlacesAutocompleteContainer
        onExpand={() => props.history.push('/create')}
      />
    </Header>
    <EventCodeFormContainer history={props.history} />
    <RecentEventsContainer history={props.history} />
    <NavBar activeTab="Home"/>
  </div>
);

HomePage.propTypes = {
  history: PropTypes.object.isRequired
};

export default HomePage;
