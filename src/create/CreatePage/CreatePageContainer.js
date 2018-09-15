import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent } from '../../create/createActions';
import CreatePage from './CreatePage';

class CreatePageContainer extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired,
  };

  state = {
    disabled: false
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ disabled: true });

    try {
      const eventId = await this.props.createEvent();
      this.props.history.push(`/${eventId}`);
    } catch (error) {
      console.error('Failed to create event.');
      this.setState({ disabled: false });
    }
  };

  render() {
    return (
      <CreatePage disabled={this.state.disabled} onSubmit={this.handleSubmit} />
    );
  }
}

const mapDispatchToProps = {
  createEvent
};

export default connect(null, mapDispatchToProps)(CreatePageContainer);
