import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {selectEventTime, selectEventLocation} from '../activeEventSelectors';
import './EventDetails.css';

const EventDetails = props => {
  const time = moment(props.dateTime).format('h:mm A');
  const date = moment(props.dateTime).format('ddd');

  return (
    <div className="EventDetails">
      <div className="EventDetails-location">
        {props.location.split(',')[0]}
      </div>
      <div className="EventDetails-dateTime">
        <div className="EventDetails-time">{time}</div>
        <div className="EventDetails-date">{date}</div>
      </div>
    </div>
  );
};

EventDetails.propTypes = {
  dateTime: PropTypes.string,
  location: PropTypes.string
};

EventDetails.defaultProps = {
  dateTime: null,
  location: ''
};

const mapStateToProps = state => ({
  dateTime: selectEventTime(state),
  location: selectEventLocation(state)
});

export default connect(
  mapStateToProps
)(EventDetails);