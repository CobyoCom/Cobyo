import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FaEllipsisH } from 'react-icons/lib/fa';
import Modal from 'react-responsive-modal';
import './EventSettings.css';

const EventSettings = props => (
  <Fragment>
    <FaEllipsisH size={24} onClick={props.onClick} />
    {props.isOpen && (
      <Modal
        classNames={{
          modal: 'EventSettings-modal'
        }}
        showCloseIcon={false}
        closeOnOverlayClick
        open={props.isOpen}
        onClose={props.onClose}
      >
        <div className="EventSettings-dropdown">
          {props.tabs.map((tab, i) => (
            <div key={i} className="EventSettings-dropdownItem">
              {tab}
            </div>
          ))}
        </div>
      </Modal>
    )}
  </Fragment>
);

EventSettings.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.node),
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

EventSettings.defaultProps = {
  tabs: []
};

export default EventSettings;
