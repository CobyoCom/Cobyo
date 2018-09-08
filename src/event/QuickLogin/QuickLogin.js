import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import TravelModeSelect from '../TravelModeSelect/TravelModeSelect';

const QuickLogin = props => (
  <div>
    {props.showTravelModeSelect ? (
      <div>
        <p>{`Logging in as ${props.userName}.`}</p>
        <TravelModeSelect onChange={props.onChangeTravelMode} />
      </div>
    ) : (
      <Button onClick={props.onSubmit} autoFocus>
        {`Login as ${props.userName}?`}
      </Button>
    )}
  </div>
);

QuickLogin.propTypes = {
  eventId: PropTypes.number.isRequired,
  userName: PropTypes.string.isRequired,
  showTravelModeSelect: PropTypes.bool.isRequired,
  onChangeTravelMode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default QuickLogin;
