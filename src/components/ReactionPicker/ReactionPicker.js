import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {DEFAULT_EMOJIS} from '../../helpers/emojis';

const ReactionEmoji = props => (
  <button
    className="ReactionPicker-emoji"
    onClick={() => props.onClick(props.emoji.codePointAt(0).toString(16))}
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
    {!!props.isOpen && DEFAULT_EMOJIS.map(emoji => (
      <ReactionEmoji
        key={emoji}
        emoji={emoji}
        onClick={x => console.log(x)}
      />
    ))}
  </div>
);

ReactionPicker.propTypes = {
  isOpen: PropTypes.bool
};

ReactionPicker.defaultProps = {
  isOpen: false
};

export default ReactionPicker;