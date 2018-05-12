import React from 'react';
import PropTypes from 'prop-types';
import {FaRefresh, FaPlay, FaPause} from 'react-icons/lib/fa';
import Button from '../../components/Button/Button';
import './EventControls.css';

const EventControls = props => (
  <div className="EventControls">
    <Button
      icon={<FaRefresh color="white" size={26} />}
      iconOnly
      disabled={props.isRefreshing}
      onClick={props.onClickRefresh}
    />
    {props.hasLeft ? (
      <Button
        icon={<FaPause color="#FFFFF" size={26} />}
        iconOnly
        disabled={props.isRefreshing}
        onClick={props.onClickCancel}
      />
    ): (
      <Button
        icon={<FaPlay color="white" size={26} />}
        iconOnly
        disabled={props.isRefreshing}
        onClick={props.onClickGo}
      />
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