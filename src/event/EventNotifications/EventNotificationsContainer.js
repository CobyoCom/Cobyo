import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchEventNotifications} from './eventNotificationsActions';
import {selectEventNotifications} from '../activeEventSelectors';
import EventNotifications from './EventNotifications';

class EventNotificationsContainer extends Component {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
    fetchEventNotifications: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.fetchEventNotifications();
  }

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

const mapDispatchToProps = {
  fetchEventNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventNotificationsContainer);