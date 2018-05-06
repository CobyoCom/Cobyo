import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../reducers/configureStore';
import {getGradientByTime, getGradientCSS} from '../helpers/colorPicker';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import ErrorBannerContainer from '../error/ErrorBanner/ErrorBannerContainer';
import HomePageContainer from '../home/HomePage/HomePageContainer';
import CreatePageContainer from '../create/CreatePage/CreatePageContainer';
import EventPageContainer from '../event/EventPage/EventPageContainer';
import SettingsPageContainer from '../settings/SettingsPage/SettingsPageContainer';
import NotFoundPage from '../pages/NotFoundPage';

const store = configureStore();
const extractParams = props => props.match.params;


class App extends Component {
  componentWillMount() {
    document.body.style.backgroundImage = getGradientCSS(getGradientByTime());
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }

  render() {
    return (
      <Provider store={store}>
        <div className="Page">
          <ErrorBannerContainer/>
          <div>
            <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => <HomePageContainer {...props} />}
                />
                <Route
                  exact
                  path="/settings"
                  render={props => <SettingsPageContainer {...props} />}
                />
                <Route
                  exact
                  path="/events"
                  render={props => <CreatePageContainer {...props} />}
                />
                <Route
                  path="/events/:eventId"
                  render={props => <Redirect to={`/${extractParams(props).eventId}`}/>}
                />
                <Route
                  exact
                  path="/404.html"
                  component={NotFoundPage}
                />
                <Route
                  exact
                  path="/:eventId"
                  render={props => <EventPageContainer {...props} {...extractParams(props)} />}
                />
              </Switch>
            </Router>
          </div>
        </div>
      </Provider>
    );
  }
}


export default App;
