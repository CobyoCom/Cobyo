import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createEvent} from '../../create/createActions';
import CreatePage from './CreatePage';

class CreatePageContainer extends Component {

  state = {
    placeValue: '',
    placeId: null,
    eventTime: new Date()
  };

  handleSubmit = e => {
    e.preventDefault();
    const {placeValue, placeId, eventTime} = this.state;
    this.props.createEvent(placeValue, placeId, eventTime).then(eventId =>
      this.props.history.push(`/${eventId}`)
    );
  };

  handleChangePlace = (placeValue) => this.setState({placeValue});

  handleSelectPlace = (placeValue, placeId) => this.setState({placeValue, placeId});

  render() {
    return (
      <CreatePage
        {...this.state}
        disabled={!this.state.placeId}
        onSubmit={this.handleSubmit}
        onSelectPlace={this.handleSelectPlace}
        onChangePlace={this.handleChangePlace}
      />
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
