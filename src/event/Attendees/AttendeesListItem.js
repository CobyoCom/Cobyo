import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  FaMale,
  FaCab,
  FaSubway,
  FaHome,
  FaFlagCheckered
} from 'react-icons/lib/fa';
import Modal from 'react-responsive-modal';
import {
  WALKING,
  DRIVING,
  TRANSIT,
  DEFAULT_TRAVEL_MODE
} from '../../helpers/globalConstants';
import TravelModeSelect from '../TravelModeSelect/TravelModeSelect';
import AttendeesListItemIcon from './AttendeesListItemIcon';
import './AttendeesListItem.css';

const getIcon = ({hasLeft, hasProbablyArrived, travelMode}) => {
  if (hasProbablyArrived) {
    return <FaFlagCheckered/>;
  }

  if (!hasLeft) {
    return <FaHome/>;
  }

  return getTravelModeIcon(travelMode)
};

const getSubIcon = ({hasLeft, hasProbablyArrived, travelMode}) => {
  if (hasLeft || hasProbablyArrived) {
    return null;
  }

  return getTravelModeIcon(travelMode);
};

const getTravelModeIcon = (travelMode) => {
  switch (travelMode) {
    case WALKING: return <FaMale />;
    case DRIVING: return <FaCab />;
    case TRANSIT: return <FaSubway />;
    default: return null;
  }
};

const AttendeesListItem = props => (
  <div className={cx("AttendeesListItem", {
    'AttendeesListItem-me': props.isMe
  })}>
    <div className="AttendeesListItem-content">
      <div>
        <AttendeesListItemIcon
          isClickable={props.isMe && !props.hasProbablyArrived}
          icon={getIcon(props)}
          subIcon={getSubIcon(props)}
          onClick={props.onClickTravelMode}
        />
        <div className="AttendeesListItem-user">
          <h2 className="AttendeesListItem-name">
            {props.userName}
          </h2>
          <span className="AttendeesListItem-lut">
            {props.lastUpdatedStatus}
          </span>
        </div>
      </div>
      <div>
        {!!props.durationStatus &&
          <span className="AttendeesListItem-eta">
            {props.durationStatus}
          </span>
        }
      </div>
    </div>

    <Modal
      little
      showCloseIcon={false}
      closeOnOverlayClick={true}
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
  hasLeft: PropTypes.bool
};

export const AttendeeDefaultProps = {
  id: null,
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
  hasProbablyArrived: PropTypes.bool.isRequired,
  durationStatus: PropTypes.string.isRequired,
  lastUpdatedStatus: PropTypes.string.isRequired,
  onClickTravelMode: PropTypes.func.isRequired,
  onCloseTravelMode: PropTypes.func.isRequired,
  onChangeTravelMode: PropTypes.func.isRequired
};

AttendeesListItem.defaultProps = {
  ...AttendeeDefaultProps
};

export default AttendeesListItem;