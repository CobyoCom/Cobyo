import React from 'react';
import PropTypes from 'prop-types';
import { DRIVING, TRANSIT, WALKING } from '../../../helpers/globalConstants';
import {
  CAR_EMOJI,
  RUNNER_EMOJI,
  RAILWAY_CAR_EMOJI
} from '../../../helpers/emojis';
import './AttendeesListItemIcon.css';

const RenderedElement = props =>
  props.isClickable ? (
    <button className="AttendeesListItemIcon" onClick={props.onClick}>
      {props.children}
    </button>
  ) : (
    <div className="AttendeesListItemIcon">{props.children}</div>
  );

const AttendeesListItemIcon = props => (
  <RenderedElement {...props}>
    <div>
      {(() => {
        switch (props.travelMode) {
          case WALKING: {
            return RUNNER_EMOJI;
          }
          case DRIVING: {
            return CAR_EMOJI;
          }
          case TRANSIT: {
            return RAILWAY_CAR_EMOJI;
          }
          default:
            return null;
        }
      })()}
    </div>
  </RenderedElement>
);

AttendeesListItemIcon.propTypes = {
  isClickable: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]).isRequired
};

AttendeesListItemIcon.defaultProps = {
  onClick: () => {}
};

export default AttendeesListItemIcon;
