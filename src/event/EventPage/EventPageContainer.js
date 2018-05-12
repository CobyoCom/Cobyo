import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getItem} from '../../helpers/localStorage';
import {fetchEvent} from '../eventActions';
import {selectEventId, selectIsLoggedIn} from '../activeEventSelectors';
import EventPage from './EventPage';

class EventPageContainer extends Component {

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventLoaded: PropTypes.bool,
    isLoggedIn: PropTypes.bool,
    fetchEvent: PropTypes.func.isRequired
  };

  static defaultProps = {
    isEventLoaded: false,
    isLoggedIn: false
  };

  state = {
    isQuickLoginModalOpen: false,
    localStorageLogin: null
  };

  async componentDidMount() {
    try {
      await this.props.fetchEvent(this.props.eventId);
      const localStorageEvents = getItem('events', true);
      const localStorageUserName = getItem('userName');

      if (!localStorageEvents || !localStorageUserName) {
        return;
      }

      const event = localStorageEvents[this.props.eventId];
      const userPreviouslyLoggedIntoEvent = !!event && event.userName === localStorageUserName;
      const userPreviouslyLoggedIn = !!localStorageUserName;

      if (userPreviouslyLoggedIntoEvent) {
        this.setState({
          isQuickLoginModalOpen: true,
          localStorageLogin: {
            ...event
          }
        });
      } else if (userPreviouslyLoggedIn) {
        this.setState({
          isQuickLoginModalOpen: true,
          localStorageLogin: {
            userName: localStorageUserName
          }
        });
      }
    } catch(error) {
      this.props.history.replace('/404.html');
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
  fetchEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPageContainer);
