import React from "react";
import PropTypes from "prop-types";
import TimeSelectModal from "../TimeSelect/TimeSelectModal";
import "./EventDetails.css";

const EventDetails = props => {
  return (
    <div className="EventDetails">
      <div className="EventDetails-title">
        {props.name && props.name.split(",")[0]}
      </div>
      {!!props.numAttendees && (
        <div className="EventDetails-subtitle">
          <a className="EventDetails-scheduledTime" onClick={props.onTimeClick}>
            {props.scheduledTimeString}
          </a>
          <span>{`${props.numAttendees} going`}</span>
        </div>
      )}
      <TimeSelectModal
        isModalOpen={props.isTimeModalOpen}
        onClose={props.onTimeModalClose}
      />
    </div>
  );
};

EventDetails.propTypes = {
  name: PropTypes.string,
  numAttendees: PropTypes.number,
  scheduledTimeString: PropTypes.string,
  showCopyClipboard: PropTypes.bool.isRequired,
  showCopyCheck: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired,
  onTimeClick: PropTypes.func.isRequired,
  isTimeModalOpen: PropTypes.bool.isRequired,
  onTimeModalClose: PropTypes.func.isRequired
};

EventDetails.defaultProps = {
  numAttendees: null
};

export default EventDetails;
