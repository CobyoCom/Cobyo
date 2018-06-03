import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {DRIVING, TRANSIT, WALKING} from '../../../helpers/globalConstants';
import {CAR_EMOJI, RAILWAY_CAR_EMOJI, RUNNER_EMOJI} from "../../../helpers/emojis";
import './AttendeesListItemLoading.css';

const AttendeesListItemLoading = props => (
  <div className="AttendeesListItemLoading">
    <div className={cx({
      'AttendeesListItemLoading--walking': props.travelMode === WALKING,
      'AttendeesListItemLoading--driving': props.travelMode === DRIVING,
      'AttendeesListItemLoading--transit': props.travelMode === TRANSIT
    })}>
      {(() => {
        switch (props.travelMode) {
          case WALKING: {
            return RUNNER_EMOJI;
          }
          case DRIVING: {
            return CAR_EMOJI;
          }
          case TRANSIT: {
            return `${RAILWAY_CAR_EMOJI} ${RAILWAY_CAR_EMOJI} ${RAILWAY_CAR_EMOJI} ${RAILWAY_CAR_EMOJI}`;
          }
          default:
            return null;
        }
      })()}
    </div>
  </div>
);

AttendeesListItemLoading.propTypes = {
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
};

export default AttendeesListItemLoading;