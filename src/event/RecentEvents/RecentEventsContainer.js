import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getItem} from '../../helpers/localStorage'
import RecentEvents from "./RecentEvents";

class RecentEventsContainer extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    events: []
  };

  componentDidMount() {
    const localStorageEvents = getItem('events', true);
    if (localStorageEvents) {
      this.setState({events: Object.values(localStorageEvents)});
    }
  }

  render() {
    return (
      <RecentEvents
        events={this.state.events}
        history={this.props.history}
      />
    );
  }
}

export default RecentEventsContainer;