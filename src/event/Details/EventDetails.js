import React from 'react';
import moment from 'moment';
import './EventDetails.css';

const EventDetails = props => {
  const eventDate = moment(props.eventTime).format('ddd');
  const eventTime = moment(props.eventTime).format('h:mm A');

  return (
    <div className="EventDetails">
      <div className="EventDetails-location">
        {props.placeName.split(',')[0]}
      </div>
      <div className="EventDetails-dateTime">
        <div className="EventDetails-time">{eventTime}</div>
        <div className="EventDetails-date">{eventDate}</div>
      </div>
    </div>
  );
};

export default EventDetails;