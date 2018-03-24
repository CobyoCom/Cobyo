import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createEvent} from '../../create/createActions';
import CreatePage from './CreatePage';

class CreatePageContainer extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.createEvent().then(eventId =>
      this.props.history.push(`/${eventId}`)
    );
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
