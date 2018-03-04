import React, { Component } from 'react';
import {connect} from 'react-redux';
import {formatDate} from '../helpers/moment';
import {createEvent} from '../event/eventActions';
import NavBar from '../navigation/NavBar/NavBar';
import EventCreateForm from '../event/CreateForm/EventCreateForm';
import './Page.css';

class CreatePage extends Component {
  state = {
    placeValue: '',
    placeId: null,
    eventTime: formatDate()
  };

  handleSubmit = e => {
    e.preventDefault();
    const {placeValue, placeId, eventTime} = this.state;
    this.props.createEvent(placeValue, placeId, eventTime).then(eventId =>
      this.props.history.push(`/events/${eventId}`)
    );
  };

  handleChangePlace = (placeValue) => this.setState({placeValue});

  handleSelectPlace = (placeValue, placeId) => this.setState({placeValue, placeId});

  render() {
    return (
      <div className="CreatePage">
        <EventCreateForm
          placeValue={this.state.placeValue}
          disabled={!this.state.placeId}
          onSubmit={this.handleSubmit}
          onSelectPlace={this.handleSelectPlace}
          onChangePlace={this.handleChangePlace}
        />
        <NavBar/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createEvent
};

export default connect(
  null,
  mapDispatchToProps
)(CreatePage);
