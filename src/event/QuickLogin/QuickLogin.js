import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';

const QuickLogin = props => (
  <div>
    <Button onClick={() => props.loginEvent(props.eventId, props.localStorageEvent.userName, props.localStorageEvent.travelMode)}>
      {`Login as ${props.localStorageEvent.userName}?`}
    </Button>
  </div>
);

QuickLogin.propTypes = {
  eventId: PropTypes.number.isRequired,
  localStorageEvent: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    travelMode: PropTypes.string.isRequired
  }),
  loginEvent: PropTypes.func.isRequired
};

export default QuickLogin;