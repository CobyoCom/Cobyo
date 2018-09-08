import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getItem } from '../../helpers/localStorage';
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

  getEvents = () => this.state.events.slice(0, 3);

  render() {
    return (
      <RecentEvents events={this.getEvents()} history={this.props.history} />
    );
  }
}

export default RecentEventsContainer;
