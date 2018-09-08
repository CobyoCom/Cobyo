import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventCodeForm from './EventCodeForm';

class EventCodeFormContainer extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    code: ''
  };

  handleChange = ({ target: { value: code } }) =>
    !isNaN(code) && this.setState({ code });

  handleSubmit = e => {
    e.preventDefault();
    this.props.history.push(`/${this.state.code}`);
  };

  getDisabled = () => !this.state.code;

  render() {
    return (
      <EventCodeForm
        value={this.state.code}
        disabled={this.getDisabled()}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default EventCodeFormContainer;
