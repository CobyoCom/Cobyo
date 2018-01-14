import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginEvent, fetchLocation} from '../event/eventActions';
import EventLoginForm from '../event/EventLoginForm';

class EventPage extends Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    loginEvent: PropTypes.func.isRequired
  };

  static defaultProps = {

  };

  handleSubmitLoginForm = (e) =>
    e.preventDefault() ||
    this.props.loginEvent(this.login.value);

  handleRefLoginForm = ref => this.login = ref;

  render() {
    return (
      <div className="EventPage">
        Event page {this.props.eventId}
        <EventLoginForm
          onSubmit={this.handleSubmitLoginForm}
          onRef={this.handleRefLoginForm}
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  loginEvent
};

export default connect(
  null,
  mapDispatchToProps
)(EventPage);
