import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectEventNotifications} from '../../activeEventSelectors';
import NotificationsList from './NotificationsList';

class NotificationsListContainer extends Component {

  static propTypes = {
    notifications: PropTypes.array.isRequired,
  };

  render() {
    return (
      <NotificationsList
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
)(NotificationsListContainer);