import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ErrorBannerContainer from './error/ErrorBanner/ErrorBannerContainer';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EventPage from './pages/EventPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

const store = configureStore();
const extractParams = props => props.match.params;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <ErrorBannerContainer/>
          <div className="Page">
            <Router>
              <Switch>
                <Route exact path="/" render={props => <HomePage {...props} />} />
                <Route exact path="/events" render={props => <CreatePage {...props} />} />
                <Route path="/events/:eventId" render={props => <Redirect to={`/${extractParams(props).eventId}`} />} />
                <Route path="/:eventId" render={props => <EventPage {...props} {...extractParams(props)} />} />
                <Route component={NotFoundPage} />
              </Switch>
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
