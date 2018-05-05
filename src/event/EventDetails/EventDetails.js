import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {formatDate} from '../../helpers/moment';
import {selectEventId, selectEventTime, selectEventLocation} from '../activeEventSelectors';
import './EventDetails.css';

const EventDetails = props => {
  const time = formatDate(props.dateTime, 'h:mm A');
  const date = formatDate(props.dateTime, 'ddd');

  return (
    <div className="EventDetails">
      <div className="EventDetails-location">
        {props.location.split(',')[0]}
      </div>
      {props.eventId}
      {props.showDateTime && (
        <div className="EventDetails-dateTime">
          <div className="EventDetails-time">{time}</div>
          <div className="EventDetails-date">{date}</div>
        </div>
      )}
    </div>
  );
};

EventDetails.propTypes = {
  eventId: PropTypes.number,
  dateTime: PropTypes.number,
  location: PropTypes.string,
  showDateTime: PropTypes.bool
};

EventDetails.defaultProps = {
  dateTime: null,
  location: '',
  showDateTime: false
};

const mapStateToProps = state => ({
  eventId: selectEventId(state),
  dateTime: selectEventTime(state),
  location: selectEventLocation(state)
});

export default connect(
  mapStateToProps
)(EventDetails);