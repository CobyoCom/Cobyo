import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeSelectReactionsById } from '../reactionsSelectors';
import NotificationReaction from './NotificationReaction';
import './NotificationReactionList.css';

const NotificationReactionList = props => (
  <div className="NotificationReactionList">
    {props.emojis.map(emoji => (
      <NotificationReaction
        key={emoji}
        emoji={emoji}
        notificationId={props.id}
      />
    ))}
  </div>
);

NotificationReactionList.propTypes = {
  id: PropTypes.string.isRequired,
  emojis: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = (state, ownProps) => ({
  emojis: makeSelectReactionsById(state, ownProps.id)
});

export default connect(mapStateToProps)(NotificationReactionList);
