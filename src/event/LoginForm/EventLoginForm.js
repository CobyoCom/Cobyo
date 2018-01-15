import React  from 'react';
import PropTypes from 'prop-types';
import './EventLoginForm.css';

const EventLoginForm = props => (
  <form
    className="EventLoginForm"
    onSubmit={props.onSubmit}
  >
    <input
      className="EventLoginForm-input"
      ref={props.onRef}
    />
  </form>
);

EventLoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired
};

export default EventLoginForm;
