import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setTravelMode, loginEvent, fetchMyETA} from '../../event/eventActions';
import {selectEventId} from '../activeEventSelectors';
import EventLoginForm from './EventLoginForm';
import {DEFAULT_TRAVEL_MODE} from '../../helpers/globalConstants';

class EventLoginFormContainer extends Component {
  static propTypes = {
    setTravelMode: PropTypes.func.isRequired,
    fetchMyETA: PropTypes.func.isRequired,
    loginEvent: PropTypes.func.isRequired
  };
  
  state = {
    nameValue: '',
    travelModeValue: DEFAULT_TRAVEL_MODE,
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
    this.props.setTravelMode(this.props.eventId, this.state.travelModeValue);

    this.props.fetchMyETA();
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    this.props.loginEvent(this.props.eventId, this.state.nameValue);
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
  setTravelMode,
  fetchMyETA,
  loginEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventLoginFormContainer);