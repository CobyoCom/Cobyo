import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginEvent, fetchMyETA} from '../../event/eventActions';
import {selectEventId} from '../activeEventSelectors';
import EventLoginForm from './EventLoginForm';
import {DRIVING} from '../TravelModeSelect/TravelModeSelect';

class EventLoginFormContainer extends Component {
  static propTypes = {
    loginEvent: PropTypes.func.isRequired,
    fetchMyETA: PropTypes.func.isRequired
  };
  
  state = {
    nameValue: '',
    travelModeValue: DRIVING,
    isModalOpen: false,
    isLoading: false
  };

  getIsDisabled = () => !this.state.nameValue;

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

    this.props.fetchMyETA();
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    this.props.loginEvent(this.props.eventId, this.state.nameValue, this.state.travelModeValue);
  };

  render() {
    return (
      <EventLoginForm
        nameValue={this.state.nameValue}
        travelModeValue={this.state.travelModeValue}
        isDisabled={this.getIsDisabled()}
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
  loginEvent,
  fetchMyETA
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventLoginFormContainer);