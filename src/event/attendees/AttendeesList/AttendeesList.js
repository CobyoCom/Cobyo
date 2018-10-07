import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { AttendeePropTypes } from "../AttendeesListItem/AttendeesListItem";
import AttendeesListItemContainer from "../AttendeesListItem/AttendeesListItemContainer";
import Modal from "react-responsive-modal";
import "./AttendeesList.css";

const AttendeesList = props => (
  <div className="AttendeesList">
    {props.selectedAttendee ? (
      <Modal
        classNames={{
          modal: 'AttendeesList-modal',
          overlay: 'AttendeesList-modal-overlay'
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
      <Fragment>
        <AttendeesListItemContainer key={props.me.userName} {...props.me} />
        {props.attendees.map(attendee => (
          <AttendeesListItemContainer key={attendee.userName} {...attendee} />
        ))}
      </Fragment>
    )}
  </div>
);

AttendeesList.propTypes = {
  me: PropTypes.shape(AttendeePropTypes).isRequired,
  attendees: PropTypes.array,
  selectedAttendee: PropTypes.object,
  onModalClose: PropTypes.func.isRequired
};

AttendeesList.defaultProps = {
  attendees: [],
  selectedAttendee: null
};

export default AttendeesList;
