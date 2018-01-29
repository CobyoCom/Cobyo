import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {FaMale, FaCab, FaSubway} from 'react-icons/lib/fa';
import './TravelModeSelect.css';

export const WALKING = 'WALKING';
export const DRIVING = 'DRIVING';
export const TRANSIT = 'TRANSIT';

const TravelModeSelect = props => (
  <div className="TravelModeSelect">
    <h3>
      How are you travelling?
    </h3>
    <div className="TravelModeSelect-list">
      <button
        className={cx('TravelModeSelect-item', {
          'TravelModeSelect-item--selected': props.travelModeValue === WALKING
        })}
        onClick={() => props.onChange(WALKING)}
      >
        <FaMale size={38} />
      </button>
      <button
        className={cx('TravelModeSelect-item', {
          'TravelModeSelect-item--selected': props.travelModeValue === DRIVING
        })}
        onClick={() => props.onChange(DRIVING)}
      >
        <FaCab size={40} />
      </button>
      <button
        className={cx('TravelModeSelect-item', {
          'TravelModeSelect-item--selected': props.travelModeValue === TRANSIT
        })}
        onClick={() => props.onChange(TRANSIT)}
      >
        <FaSubway size={36} />
      </button>
    </div>
    <div className={cx('TravelModeSelect-bar', {'TravelModeSelect-loading': props.isLoading})}/>
  </div>
);

TravelModeSelect.propTypes = {
  isLoading: PropTypes.bool,
  travelModeValue: PropTypes.oneOf(['WALKING', 'DRIVING', 'TRANSIT']),
  onChange: PropTypes.func.isRequired
};

TravelModeSelect.defaultProps = {
  isLoading: false,
  travelModeValue: DRIVING
};

export default TravelModeSelect;