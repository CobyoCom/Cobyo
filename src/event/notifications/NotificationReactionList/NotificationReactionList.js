import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {DEFAULT_EMOJIS} from "../../../helpers/emojis";
import NotificationReaction from './NotificationReaction';
import './NotificationReactionList.css';

const NotificationReactionList = props => (
  <div className="NotificationReactionList">
    {props.emojis.map(emoji => (
      <NotificationReaction emoji={emoji} />
    ))}
  </div>
);

NotificationReactionList.propTypes = {
  emojis: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => ({
  emojis: DEFAULT_EMOJIS.slice(1)
});

export default connect(
  mapStateToProps
)(NotificationReactionList);