import React from 'react';
import PropTypes from 'prop-types';
import {
  FaMale,
  FaCab,
  FaSubway,
  FaHome
} from 'react-icons/lib/fa';
import Modal from 'react-responsive-modal';
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
    return <FaHome size={28} />;
  }

  switch (travelMode) {
    case WALKING: return <FaMale size={26} />;
    case DRIVING: return <FaCab size={24} />;
    case TRANSIT: return <FaSubway size={24} />;
    default: return null;
  }
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