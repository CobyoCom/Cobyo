import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchEvent, loginEvent} from '../../event/eventActions';
import {selectEventId, selectIsLoggedIn} from '../../event/activeEventSelectors';
import EventPage from './EventPage';

class EventPageContainer extends Component {

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventLoaded: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    fetchEvent: PropTypes.func.isRequired,
    loginEvent: PropTypes.func.isRequired
  };

  static defaultProps = {
    isEventLoaded: false,
    isLoggedIn: false
  };

  state = {
    isQuickLoginModalOpen: false,
    localStorageEvent: null
  };

  async componentDidMount() {
    try {
      await this.props.fetchEvent(this.props.eventId);
      const localStorageEvents = localStorage.getItem('events');

      if (!localStorageEvents) {
        return;
      }

      const events = JSON.parse(localStorageEvents);
      const event = events[this.props.eventId];
      if (event) {
        this.setState({
          isQuickLoginModalOpen: true,
          localStorageEvent: event
        });
      }
    } catch(error) {
      this.props.history.replace('/404');
    }
  }

  handleCloseQuickLoginModal = () => this.setState({isQuickLoginModalOpen: false});

  render() {
    return (
      <EventPage
        {...this.props}
        eventId={parseInt(this.props.eventId, 10)}
        {...this.state}
        onCloseQuickLoginModal={this.handleCloseQuickLoginModal}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  isEventLoaded: selectEventId(state) !== null
});

const mapDispatchToProps = {
  fetchEvent,
  loginEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPageContainer);