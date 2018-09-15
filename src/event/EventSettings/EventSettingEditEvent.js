import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaClipboard } from 'react-icons/lib/fa';
import Button from '../../components/Button/Button';

const EventSettingEditEvent = props => (
  <Link to={`${props.eventId}/edit`}>
    <Button
      icon={<FaClipboard color="white" size={16} />}
    >
      Edit Event
    </Button>
  </Link>
);

EventSettingEditEvent.propTypes = {
  eventId: PropTypes.string.isRequired
};

export default EventSettingEditEvent;