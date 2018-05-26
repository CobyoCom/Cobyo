import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createEvent} from '../../create/createActions';
import CreatePage from './CreatePage';

class CreatePageContainer extends Component {

  handleSubmit = async e => {
    e.preventDefault();
    try {
      const eventId = await this.props.createEvent();
      this.props.history.push(`/${eventId}`);
    } catch (error) {
      console.error('Failed to create event.');
    }
  };

  render() {
    return (
      <CreatePage onSubmit={this.handleSubmit}/>
    );
  }
}

const mapDispatchToProps = {
  createEvent
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePageContainer);
