import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getItem} from '../../helpers/localStorage'
import RecentEvents from './RecentEvents';

class RecentEventsContainer extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    events: []
  };

  componentDidMount() {
    const localStorageEvents = getItem('events', true);
    const localStorageEventIds = getItem('eventIds', true);
    if (localStorageEvents && localStorageEventIds) {
      this.setState({
        events: localStorageEventIds.map(eventId => localStorageEvents[eventId])
      });
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