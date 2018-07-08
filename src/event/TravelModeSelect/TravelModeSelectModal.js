import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import TravelModeSelect from './TravelModeSelect';

const TravelModeSelectModal = props => (
  <Modal
    center
    showCloseIcon={false}
    closeOnOverlayClick={true}
    open={props.isOpen}
    onClose={props.onClose}
  >
    <TravelModeSelect
      isLoading={props.isLoading}
      onChange={props.onChange}
      travelModeValue={props.travelModeValue}
    />
  </Modal>
);

TravelModeSelectModal.propTypes = {
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  travelModeValue: PropTypes.any
};

TravelModeSelectModal.defaultProps = {
  isLoading: false,
  isOpen: false
};

export default TravelModeSelectModal;