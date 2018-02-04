import React from 'react';
import PropTypes from 'prop-types';
import {FaRefresh} from 'react-icons/lib/fa';
import Button from '../../components/Button/Button';

const EventControls = props => (
  <div className="EventControls">
    <Button
      onClick={props.onClickRefresh}
      disabled={props.isDisabledRefresh}
    >
      <FaRefresh/>
    </Button>
    {props.hasLeft ? (
      <Button
        onClick={props.onClickCancel}
      >
        Cancel
      </Button>
    ): (
      <Button
        onClick={props.onClickGo}
      >
        Go
      </Button>
    )}
  </div>
);

EventControls.propTypes = {
  hasLeft: PropTypes.bool.isRequired,
  isDisabledRefresh: PropTypes.bool.isRequired,
  onClickRefresh: PropTypes.func.isRequired,
  onClickCancel: PropTypes.func.isRequired,
  onClickGo: PropTypes.func.isRequired
};

export default EventControls;