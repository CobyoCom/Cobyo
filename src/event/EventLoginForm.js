import React, { Component } from 'react';
import PropTypes from 'prop-types';

const EventLoginForm = props => (
  <form
    className="EventLoginForm"
    onSubmit={props.onSubmit}
  >
    <input ref={props.onRef}/>
  </form>
);

EventLoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired
};

export default EventLoginForm;
