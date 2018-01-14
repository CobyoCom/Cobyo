import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EventPage from './pages/EventPage';

const store = configureStore();
const extractParams = props => props.match.params;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={props => <HomePage {...props} />} />
            <Route exact path="/events" render={props => <CreatePage {...props} />} />
            <Route path="/events/:eventId" render={props => <EventPage {...props} {...extractParams(props)} />} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
