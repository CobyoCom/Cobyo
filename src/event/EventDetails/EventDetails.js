import React from 'react';
import PropTypes from 'prop-types';
import {FaClipboard, FaCheckCircleO} from 'react-icons/lib/fa';
import CopyToClipboard from 'react-copy-to-clipboard';
import './EventDetails.css';

const EventDetails = props => {
  return (
    <div className="EventDetails">
      <div className="EventDetails-copy">
        {props.showCopyClipboard && (
          <CopyToClipboard
            text={window.location.href}
            onCopy={props.onCopy}
          >
            <FaClipboard
              color="white"
              size={16}
            />
          </CopyToClipboard>
        )}
        {props.showCopyCheck && (
          <FaCheckCircleO
            color="green"
            size={20}
          />
        )}
      </div>
      <div className="EventDetails-eventId">{props.eventId}</div>
      <div className="EventDetails-location">{props.location.split(',')[0]}</div>
      {!!props.numAttendees && (
        <div className="EventDetails-numAttendees">{`${props.numAttendees} going`}</div>
      )}
    </div>
  );
};

EventDetails.propTypes = {
  eventId: PropTypes.number,
  dateTime: PropTypes.number,
  location: PropTypes.string,
  showDateTime: PropTypes.bool,
  showCopyClipboard: PropTypes.bool.isRequired,
  showCopyCheck: PropTypes.bool.isRequired,
  onCopy: PropTypes.func.isRequired
};

EventDetails.defaultProps = {
  dateTime: null,
  location: '',
  showDateTime: false
};



export default EventDetails;