import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './reducers/configureStore';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path="/" render={props => <HomePage {...props} />} />
            <Route exact path="/login" render={props => <LoginPage {...props} />} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
