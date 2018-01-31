import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchEvent, fetchMyETA, getAttendees} from '../event/eventActions';
import {selectPlaceId, selectPlaceName, selectEventTime, selectIsLoggedIn} from '../event/activeEventSelectors';
import Button from '../components/Button/Button';
import EventDetails from '../event/Details/EventDetails';
import EventLoginFormContainer from '../event/LoginForm/EventLoginFormContainer';
import AttendeesListContainer from '../event/AttendeesList/AttendeesListContainer';
import NavBar from '../navigation/NavBar/NavBar';
import './Page.css';

class EventPage extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    placeId: PropTypes.string,
    placeName: PropTypes.string,
    eventTime: PropTypes.string,
    isLoggedIn: PropTypes.bool
  };

  static defaultProps = {
    placeId: null,
    placeName: '',
    eventTime: null,
    isLoggedIn: false,
    isOpenTravelMode: false
  };

  state = {
    isRefreshing: false
  };

  async componentDidMount() {
    try {
      await this.props.fetchEvent(this.props.eventId);
    } catch(error) {
      this.props.history.replace('/404');
    }
  }

  handleRefresh = async () => {
    this.setState({isRefreshing: true});
    try {
      await this.props.fetchMyETA();
      this.props.getAttendees();
      this.setState({isRefreshing: false});
    } catch(error) {
      console.warn('Refresh failed');
    }
  };

  render() {
    return (
      <div className="EventPage">
        <EventDetails
          placeName={this.props.placeName}
          eventTime={this.props.eventTime}
        />

        {!this.props.isLoggedIn && <EventLoginFormContainer/>}

        {this.props.isLoggedIn && <AttendeesListContainer/>}

        {this.props.isLoggedIn && (
          <Button
            onClick={this.handleRefresh}
            disabled={this.state.isRefreshing}
          >
            Refresh
          </Button>
        )}
        <NavBar/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeId: selectPlaceId(state),
  placeName: selectPlaceName(state),
  eventTime: selectEventTime(state),
  isLoggedIn: selectIsLoggedIn(state)
});

const mapDispatchToProps = {
  fetchEvent,
  fetchMyETA,
  getAttendees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);
