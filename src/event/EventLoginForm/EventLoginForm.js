import React  from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import TravelModeSelect from '../TravelModeSelect/TravelModeSelect';
import './EventLoginForm.css';

const EventLoginForm = props => (
  <form
    className="EventLoginForm"
    onSubmit={props.onSubmit}
  >
    <Input
      size="medium"
      maxLength={24}
      value={props.nameValue}
      placeholder={"Enter name..."}
      onChange={props.onChangeName}
    />

    <Button
      disabled={props.isDisabled}
    >
      Continue
    </Button>

    <Modal
      little
      open={props.isModalOpen}
      showCloseIcon={false}
      closeOnOverlayClick={false}
      onClose={props.onCloseModal}
    >
      <TravelModeSelect
        isLoading={props.isLoading}
        travelModeValue={props.travelModeValue}
        onChange={props.onChangeTravelMode}
      />
    </Modal>
  </form>
);

EventLoginForm.propTypes = {
  nameValue: PropTypes.string.isRequired,
  travelModeValue: PropTypes.string,
  isDisabled: PropTypes.bool.isRequired,
  isModalOpen: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChangeName: PropTypes.func.isRequired,
  onChangeTravelMode: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

EventLoginForm.defaultProps = {
  isDisabled: true,
  isModalOpen: false,
  isLoading: false
};

export default EventLoginForm;
