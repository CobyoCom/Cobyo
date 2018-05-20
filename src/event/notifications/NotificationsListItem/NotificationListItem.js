import React from 'react';
import PropTypes from 'prop-types';
import {fromNow} from '../../../helpers/moment';
import NotificationReactionList from '../NotificationReactionList/NotificationReactionList'
import ReactionButton from '../../../components/ReactionPicker/ReactionButton';
import './NotificationListItem.css';

const NotificationListItem = props => (
  <div
    key={props.id}
    className="NotificationListItem"
  >
    <div className="NotificationListItem-header">
      <span className="NotificationListItem-message">
        <strong>{props.userName}</strong>{` ${props.message}`}
      </span>
      <ReactionButton/>
    </div>
    <div className="NotificationListItem-footer">
      <span className="NotificationListItem-timestamp">
        {fromNow(props.timestamp)}
      </span>
        <NotificationReactionList/>
    </div>

  </div>
);

NotificationListItem.propTypes = {
  id: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  userName: PropTypes.string,
  message: PropTypes.string
};

NotificationListItem.defaultProps = {
  userName: null,
  message: null
};

export default NotificationListItem;