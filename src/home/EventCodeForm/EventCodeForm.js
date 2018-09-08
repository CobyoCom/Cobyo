import React from 'react';
import PropTypes from 'prop-types';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import './EventCodeForm.css';

const EventCodeForm = props => (
  <form className="EventCodeForm" onSubmit={props.onSubmit}>
    <h2>Enter event code</h2>
    <Input
      size="medium"
      maxLength={4}
      value={props.value}
      onChange={props.onChange}
    />
    <Button size="small" disabled={props.disabled}>
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
