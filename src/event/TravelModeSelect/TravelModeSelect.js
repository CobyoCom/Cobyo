import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { FaMale, FaCab, FaSubway } from "react-icons/lib/fa";
import {
  WALKING,
  DRIVING,
  TRANSIT,
  DEFAULT_TRAVEL_MODE
} from "../../helpers/globalConstants";
import "./TravelModeSelect.css";

const TravelModeSelect = props => (
  <div className="TravelModeSelect">
    <h3>How are you travelling?</h3>
    <div className="TravelModeSelect-list">
      <button
        className={cx("TravelModeSelect-item", {
          "TravelModeSelect-item--selected": props.travelModeValue === WALKING
        })}
        onClick={() => props.onChange(WALKING)}
        autoFocus={props.travelModeValue === WALKING}
        disabled={props.isLoading}
      >
        <FaMale size={38} />
      </button>
      <button
        className={cx("TravelModeSelect-item", {
          "TravelModeSelect-item--selected": props.travelModeValue === DRIVING
        })}
        onClick={() => props.onChange(DRIVING)}
        autoFocus={props.travelModeValue === DRIVING}
        disabled={props.isLoading}
      >
        <FaCab size={40} />
      </button>
      <button
        className={cx("TravelModeSelect-item", {
          "TravelModeSelect-item--selected": props.travelModeValue === TRANSIT
        })}
        onClick={() => props.onChange(TRANSIT)}
        autoFocus={props.travelModeValue === TRANSIT}
        disabled={props.isLoading}
      >
        <FaSubway size={36} />
      </button>
    </div>
    <div
      className={cx("TravelModeSelect-bar", {
        "TravelModeSelect-loading": props.isLoading
      })}
    />
  </div>
);

TravelModeSelect.propTypes = {
  isLoading: PropTypes.bool,
  travelModeValue: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
  onChange: PropTypes.func.isRequired
};

TravelModeSelect.defaultProps = {
  isLoading: false,
  travelModeValue: DEFAULT_TRAVEL_MODE
};

export default TravelModeSelect;
