import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';
import {makeSelectDidUserReact, makeSelectReactionCount} from '../reactionsSelectors';
import {reactToNotification} from '../notificationsActions';
import Button from '../../../components/Button/Button';

const NotificationReaction = props => (
  <div className={cx('NotificationReaction', {
    'NotificationReaction--selected': props.isSelected
  })}>
    <Button
      size="small"
      variation={props.isSelected ? "primary" : "secondary"}
      onClick={props.onClick}
    >
      <span className="NotificationReaction-emoji">{props.emoji}</span>
      <span className="NotificationReaction-count">{props.count}</span>
    </Button>
  </div>
);

NotificationReaction.propTypes = {
  notificationId: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};

NotificationReaction.defaultProps = {
  isSelected: false
};

const mapStateToProps = (state, ownProps) => ({
  count: makeSelectReactionCount(state, ownProps.notificationId, ownProps.emoji),
  isSelected: makeSelectDidUserReact(state, ownProps.notificationId, ownProps.emoji)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(reactToNotification(ownProps.notificationId, ownProps.emoji))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationReaction);