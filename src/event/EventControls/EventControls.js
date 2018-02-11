import React from 'react';
import PropTypes from 'prop-types';
import {FaRefresh} from 'react-icons/lib/fa';
import Button from '../../components/Button/Button';
import './EventControls.css';

const EventControls = props => (
  <div className="EventControls">
    <Button
      onClick={props.onClickRefresh}
      disabled={props.isRefreshing}
    >
      <FaRefresh/>
    </Button>
    {props.hasLeft ? (
      <Button
        disabled={props.isRefreshing}
        onClick={props.onClickCancel}
      >
        Stop
      </Button>
    ): (
      <Button
        disabled={props.isRefreshing}
        onClick={props.onClickGo}
      >
        Go
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