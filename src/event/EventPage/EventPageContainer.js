import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchEvent} from '../eventActions';
import {selectEventId, selectHasEventEnded, selectIsLoggedIn} from '../activeEventSelectors';
import EventPage from './EventPage';

class EventPageContainer extends Component {

  static propTypes = {
    eventId: PropTypes.string.isRequired,
    isEventLoaded: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    hasEnded: PropTypes.bool.isRequired,
    fetchEvent: PropTypes.func.isRequired
  };

  state = {
    isQuickLoginModalOpen: false,
    localStorageLogin: null
  };

  async componentDidMount() {
    try {
      const {localStorageEvent, localStorageUserName} = await this.props.fetchEvent(this.props.eventId);
      if (!!localStorageEvent) {
        this.setState({
          isQuickLoginModalOpen: true,
          localStorageLogin: {
            ...localStorageEvent
          }
        });
      } else if (!!localStorageUserName) {
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

  getShowEventEnded = () => this.props.hasEnded;

  getShowLogin = () => !this.getShowEventEnded() && this.props.isEventLoaded && !this.props.isLoggedIn;

  getShowQuickLogin = () => !this.getShowEventEnded() && this.props.isEventLoaded && !this.props.isLoggedIn && !!this.state.localStorageLogin;

  getShowEventMap = () => !this.getShowEventEnded() && this.props.isLoggedIn;

  getShowAttendeesList = () => !this.getShowEventEnded() && this.props.isLoggedIn;

  getShowNotifications = () => !this.getShowEventEnded() && this.props.isLoggedIn;

  handleCloseQuickLoginModal = () => this.setState({isQuickLoginModalOpen: false});

  render() {
    return (
      <EventPage
        eventId={parseInt(this.props.eventId, 10)}
        showLogin={this.getShowLogin()}
        showQuickLogin={this.getShowQuickLogin()}
        showEventMap={this.getShowEventMap()}
        showAttendeesList={this.getShowAttendeesList()}
        showNotifications={this.getShowNotifications()}
        showEventEnded={this.getShowEventEnded()}
        {...this.state}
        onCloseQuickLoginModal={this.handleCloseQuickLoginModal}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: selectIsLoggedIn(state),
  isEventLoaded: selectEventId(state) !== null,
  hasEnded: selectHasEventEnded(state)
});

const mapDispatchToProps = {
  fetchEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPageContainer);
