import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Button from '../components/Button/Button';
import {createEvent} from './createActions';
import SearchPlacesContainer from '../create/SearchPlacesContainer';

class CreateForm extends Component {
  static propTypes = {
    createEvent: PropTypes.func.isRequired
  };

  state = {
    placeValue: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    const {placeValue} = this.state;
    this.props.createEvent({placeValue});
  };

  handleChangePlace = (placeValue) => this.setState({ placeValue });

  render() {
    return (
      <form
        className="CreateForm"
        onSubmit={this.handleSubmit}
      >
        <SearchPlacesContainer
          placeValue={this.state.placeValue}
          onChangePlace={this.handleChangePlace}
        />
        <Button
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createEvent
};

export default connect(
  null,
  mapDispatchToProps
)(CreateForm);
