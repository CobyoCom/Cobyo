import React from "react";
import PropTypes from "prop-types";
import AttendeesListItemContainer from "../AttendeesListItem/AttendeesListItemContainer";
import Modal from "react-responsive-modal";
import "./AttendeesList.css";

const AttendeesList = props => (
  <div className="AttendeesList">
    {props.selectedAttendee ? (
      <Modal
        classNames={{
          modal: "AttendeesList-modal",
          overlay: "AttendeesList-modal-overlay"
        }}
        showCloseIcon={false}
        open={!!props.selectedAttendee}
        onClose={props.onModalClose}
      >
        <div className="AttendeesList-selected">
          <AttendeesListItemContainer
            key={props.selectedAttendee.userName}
            {...props.selectedAttendee}
          />
        </div>
      </Modal>
    ) : (
      props.attendees.map(attendee => (
        <AttendeesListItemContainer key={attendee.user.name} {...attendee} />
      ))
    )}
  </div>
);

AttendeesList.propTypes = {
  attendees: PropTypes.array,
  selectedAttendee: PropTypes.object,
  onModalClose: PropTypes.func.isRequired
};

AttendeesList.defaultProps = {
  attendees: [],
  selectedAttendee: null
};

export default AttendeesList;
