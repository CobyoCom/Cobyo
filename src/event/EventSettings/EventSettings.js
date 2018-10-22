import React from "react";
import PropTypes from "prop-types";
import { FaEllipsisH } from "react-icons/lib/fa";
import Modal from "react-responsive-modal";
import "./EventSettings.css";

const EventSettings = props => (
  <div className="EventSettings">
    <FaEllipsisH size={24} onClick={props.onClick} />
    {props.isOpen && (
      <Modal
        classNames={{
          modal: "EventSettings-modal"
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
  </div>
);

EventSettings.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.node),
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

EventSettings.defaultProps = {
  tabs: []
};

export default EventSettings;
