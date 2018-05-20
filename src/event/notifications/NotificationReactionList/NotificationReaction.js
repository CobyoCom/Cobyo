import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';
import Button from '../../../components/Button/Button';

const NotificationReaction = props => (
  <div className={cx('NotificationReaction', {
    'NotificationReaction--selected': props.isSelected
  })}>
    <Button
      size="small"
      variation={props.isSelected ? "primary" : "secondary"}
    >
      <span className="NotificationReaction-emoji">{props.emoji}</span>
      <span className="NotificationReaction-count">{props.count}</span>
    </Button>
  </div>
);

NotificationReaction.propTypes = {
  emoji: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isSelected: PropTypes.bool
};

NotificationReaction.defaultProps = {
  isSelected: false
};

const mapStateToProps = state => ({
  count: 1
});

export default connect(
  mapStateToProps
)(NotificationReaction);