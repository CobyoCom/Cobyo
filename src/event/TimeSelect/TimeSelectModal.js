import React from "react";
import PropTypes from "prop-types";
import Modal from "react-responsive-modal";
import TimeSelect from "./TimeSelect";

const TimeSelectModal = props => (
  <Modal
    open={props.isModalOpen}
    center
    showCloseIcon={false}
    onClose={props.onClose}
  >
    <TimeSelect onConfirmTime={props.onClose} />
  </Modal>
);

TimeSelectModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TimeSelectModal;
