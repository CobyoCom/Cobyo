import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomePage from './HomePage';

class HomePageContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  render() {
    return <HomePage history={this.props.history} />;
  }
}

export default HomePageContainer;
