import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editEvent } from '../editActions';
import CreatePage from '../../create/CreatePage/CreatePage';

class EditEventPageContainer extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    editEvent: PropTypes.func.isRequired
  };

  state = {
    disabled: false
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.editEvent(this.props.match.params.eventId);
  };

  render() {
    return (
      <CreatePage disabled={this.state.disabled} onSubmit={this.handleSubmit} />
    );
  }
}

const mapDispatchToProps = {
  editEvent
};

export default connect(null, mapDispatchToProps)(EditEventPageContainer);
