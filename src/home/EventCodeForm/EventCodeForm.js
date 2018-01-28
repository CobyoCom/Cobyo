import React  from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './EventCodeForm.css';

const EventCodeForm = props => (
  <form
    className="EventCodeForm"
    onSubmit={props.onSubmit}
  >
    <h1>Enter event code</h1>
    <Input
      size="large"
      maxLength={4}
      value={props.value}
      onChange={props.onChange}
    />
    <Button
      disabled={props.disabled}
    >
      Continue
    </Button>
  </form>
);

EventCodeForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default EventCodeForm;