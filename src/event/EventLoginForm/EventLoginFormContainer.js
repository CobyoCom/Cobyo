import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {DEFAULT_TRAVEL_MODE} from '../../helpers/globalConstants';
import {loginEvent} from '../eventUserActions';
import {selectEventId} from '../activeEventSelectors';
import EventLoginForm from './EventLoginForm';

class EventLoginFormContainer extends Component {

  static propTypes = {
    eventId: PropTypes.number.isRequired,
    loginEvent: PropTypes.func.isRequired
  };
  
  state = {
    nameValue: '',
    travelModeValue: DEFAULT_TRAVEL_MODE,
    isModalOpen: false,
    isLoading: false
  };

  handleChangeName = ({target: {value: nameValue}}) => this.setState({nameValue});

  handleChangeTravelMode = travelModeValue =>
    this.setState({travelModeValue},
      this.handleCloseModal
    );

  handleSubmit = e => {
    e.preventDefault();
    this.setState({isModalOpen: true});
  };

  handleCloseModal = async () => {
    if (!this.state.nameValue || !this.state.travelModeValue) {
      return;
    }

    this.setState({isLoading: true});
    // Show the loading bar because the quick movement is a bit jarring
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.props.loginEvent(this.props.eventId, this.state.nameValue, this.state.travelModeValue);
  };

  render() {
    return (
      <EventLoginForm
        nameValue={this.state.nameValue}
        travelModeValue={this.state.travelModeValue}
        isDisabled={!this.state.nameValue}
        isModalOpen={this.state.isModalOpen}
        isLoading={this.state.isLoading}
        onChangeName={this.handleChangeName}
        onChangeTravelMode={this.handleChangeTravelMode}
        onSubmit={this.handleSubmit}
        onCloseModal={this.handleCloseModal}
      />
    );
  }
}

const mapStateToProps = state => ({
  eventId: selectEventId(state)
});

const mapDispatchToProps = {
  loginEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventLoginFormContainer);