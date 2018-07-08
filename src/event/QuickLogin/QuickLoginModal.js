import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-responsive-modal';
import QuickLoginContainer from './QuickLoginContainer';

const QuickLoginModal = props => (
  <Modal
    center
    open={props.isOpen}
    showCloseIcon={false}
    onClose={props.onClose}
  >
    <QuickLoginContainer
      userName={props.userName}
      travelMode={props.travelMode}
    />
  </Modal>
);

QuickLoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
  travelMode: PropTypes.string
};

QuickLoginModal.defaultProps = {
  isOpen: false,
  travelMode: null
};

export default QuickLoginModal;