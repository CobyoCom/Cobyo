import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchEvent, loginEvent} from '../event/eventActions';
import {selectPlaceId, selectEventTime} from '../event/eventSelectors';
import NavBar from '../navigation/NavBar/NavBar';
import EventLoginForm from '../event/LoginForm/EventLoginForm';

class EventPage extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    loginEvent: PropTypes.func.isRequired,
    placeId: PropTypes.string,
    eventTime: PropTypes.string
  };

  static defaultProps = {
    placeId: null,
    eventTime: null
  };

  async componentDidMount() {
    try {
      await this.props.fetchEvent(this.props.eventId);
    } catch(error) {
      this.props.history.replace('/404');
    }
  }

  handleSubmitLoginForm = (e) =>
    e.preventDefault() ||
    this.props.loginEvent(this.login.value);

  handleRefLoginForm = ref => this.login = ref;

  render() {
    return (
      <div className="EventPage">
        <h1>{this.props.placeId}</h1>
        <h3>{this.props.eventTime}</h3>
        <EventLoginForm
          onSubmit={this.handleSubmitLoginForm}
          onRef={this.handleRefLoginForm}
        />
        <NavBar/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeId: selectPlaceId(state),
  eventTime: selectEventTime(state)
});

const mapDispatchToProps = {
  fetchEvent,
  loginEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);
