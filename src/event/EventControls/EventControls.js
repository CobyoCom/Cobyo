import React from 'react';
import PropTypes from 'prop-types';
import {FaLocationArrow} from 'react-icons/lib/fa';
import Button from '../../components/Button/Button';
import './EventControls.css';

const EventControls = props => (
  <div className="EventControls">
    <Button
      icon={<FaLocationArrow/>}
      size="small"
      disabled={props.isRefreshing}
      onClick={props.onClickRefresh}
    >
      Update
    </Button>
    {props.hasLeft ? (
      <Button
        size="small"
        disabled={props.isRefreshing}
        onClick={props.onClickCancel}
      >
        Pause
      </Button>
    ): (
      <Button
        size="small"
        disabled={props.isRefreshing}
        onClick={props.onClickGo}
      >
        Depart
      </Button>
    )}
  </div>
);

EventControls.propTypes = {
  hasLeft: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  onClickRefresh: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onClickGo: PropTypes.func.isRequired
};

export default EventControls;