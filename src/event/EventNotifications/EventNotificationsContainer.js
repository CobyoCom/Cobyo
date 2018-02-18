import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectEventNotifications} from '../activeEventSelectors';
import EventNotifications from './EventNotifications';

class EventNotificationsContainer extends Component {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
  };

  render() {
    return (
      <EventNotifications
        notifications={this.props.notifications}
      />
    );
  }
}

const mapStateToProps = state => ({
  notifications: selectEventNotifications(state)
});


export default connect(
  mapStateToProps
)(EventNotificationsContainer);