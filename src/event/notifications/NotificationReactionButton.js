import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reactToEventNotification} from './eventNotificationsActions';
import ReactionButton from '../../components/ReactionPicker/ReactionButton';

const NotificationReactionButton = props => <ReactionButton onEmojiClick={props.onEmojiClick}/>;

NotificationReactionButton.propTypes = {
  notificationId: PropTypes.string.isRequired,
  onEmojiClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onEmojiClick: (emoji) => dispatch(reactToEventNotification(ownProps.notificationId, emoji))
});

export default connect(
  null,
  mapDispatchToProps
)(NotificationReactionButton);