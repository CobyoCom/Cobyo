import React from "react";
import PropTypes from "prop-types";
import { DRIVING, TRANSIT, WALKING } from "../../../helpers/globalConstants";
import {
  CAR_EMOJI,
  RAILWAY_CAR_EMOJI,
  RUNNER_EMOJI
} from "../../../helpers/emojis";
import cx from "classnames";
import "./LastUpdatedTime.css";

const LastUpdatedTime = props => (
  <div className="LastUpdatedTime">
    <span>{props.updatedTimeStatus}</span>
    {(props.isRefreshing) && (
      <div className="refreshing">
        <span
          className={cx({
            "LastUpdatedTime-refreshing--walking": props.travelMode === WALKING,
            "LastUpdatedTime-refreshing--driving": props.travelMode === DRIVING,
            "LastUpdatedTime-refreshing--transit": props.travelMode === TRANSIT
          })}
        >
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
        </span>
      </div>
    )}
  </div>
);

LastUpdatedTime.propTypes = {
  updatedTimeStatus: PropTypes.string.isRequired,
  isRefreshing: PropTypes.bool,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]).isRequired
};

LastUpdatedTime.defaultProps = {
  isRefreshing: false
};

export default LastUpdatedTime;
