import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {DEFAULT_EMOJIS} from '../../helpers/emojis';

const ReactionEmoji = props => (
  <button
    className="ReactionPicker-emoji"
    onClick={() => props.onClick(props.emoji)}
  >
    {props.emoji}
  </button>
);

ReactionEmoji.propTypes = {
  emoji: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const ReactionPicker = props => (
  <div className={cx('ReactionPicker', {
    'ReactionPicker-open': props.isOpen
  })}>
    {props.isOpen && DEFAULT_EMOJIS.map(emoji => (
      <ReactionEmoji
        key={emoji}
        emoji={emoji}
        onClick={props.onEmojiClick}
      />
    ))}
  </div>
);

ReactionPicker.propTypes = {
  isOpen: PropTypes.bool,
  onEmojiClick: PropTypes.func.isRequired
};

ReactionPicker.defaultProps = {
  isOpen: false
};

export default ReactionPicker;