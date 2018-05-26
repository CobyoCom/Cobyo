import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
