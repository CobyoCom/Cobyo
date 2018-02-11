import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  FaMale,
  FaCab,
  FaSubway,
  FaHome
} from 'react-icons/lib/fa';
import Modal from 'react-responsive-modal';
import {
  fromNow,
  addTime
} from '../../../helpers/moment';
import {
  WALKING,
  DRIVING,
  TRANSIT,
  DEFAULT_TRAVEL_MODE
} from '../../../helpers/globalConstants';
import TravelModeSelect from '../../TravelModeSelect/TravelModeSelect';
import './AttendeesListItem.css';

const getIcon = (hasLeft, travelMode) => {
  if (!hasLeft) {
    return <FaHome/>;
  }

  switch (travelMode) {
    case WALKING: return <FaMale/>;
    case DRIVING: return <FaCab/>;
    case TRANSIT: return <FaSubway/>;
    default: return null;
  }
};

const formatArrivalTime = eta => {
  return moment(eta).calendar(null, {
    sameDay: 'h:mm a',
    nextDay: '[Tomorrow at ] h:mm a',
    nextWeek: 'dddd h:mm a',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: '[-]'
  });
};

const AttendeesListItem = props => (
  <div className="AttendeesListItem">
    <div className="AttendeesListItem-content">
      <div>
        {props.isMe ? (
          <button
            className="AttendeesListItem-icon"
            onClick={props.onClickTravelMode}
          >
            {getIcon(props.hasLeft, props.travelMode)}
          </button>
        ) : (
          <div className="AttendeesListItem-icon">
            {getIcon(props.hasLeft, props.travelMode)}
          </div>
        )}
        <div className="AttendeesListItem-user">
          <h2 className="AttendeesListItem-name">
            {props.userName}
          </h2>
          <span className="AttendeesListItem-lut">
            {fromNow(props.lastUpdated)}
          </span>
        </div>
      </div>
      <div>
        <span className="AttendeesListItem-eta">
          {props.duration === null ? (
            formatArrivalTime(null)
          ): (
            formatArrivalTime(addTime(props.duration, props.lastUpdated).format('YYYY-MM-DD HH:mm'))
          )}
        </span>
      </div>
    </div>

    <Modal
      little
      showCloseIcon={false}
      closeOnOverlayClick={false}
      open={props.isTravelModeOpen}
      onClose={props.onCloseTravelMode}
    >
      <TravelModeSelect
        onChange={props.onChangeTravelMode}
        travelModeValue={props.travelMode}
      />
    </Modal>
  </div>
);

export const AttendeePropTypes = {
  userName: PropTypes.string,
  duration: PropTypes.number,
  lastUpdated: PropTypes.string,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
  hasLeft: PropTypes.bool,
};

export const AttendeeDefaultProps = {
  userName: '',
  duration: null,
  lastUpdated: null,
  travelMode: DEFAULT_TRAVEL_MODE,
  hasLeft: false
};

AttendeesListItem.propTypes = {
  ...AttendeePropTypes,
  isMe: PropTypes.bool.isRequired,
  isTravelModeOpen: PropTypes.bool.isRequired,
  onClickTravelMode: PropTypes.func.isRequired,
  onCloseTravelMode: PropTypes.func.isRequired,
  onChangeTravelMode: PropTypes.func.isRequired
};

AttendeesListItem.defaultProps = {
  ...AttendeeDefaultProps
};

export default AttendeesListItem;