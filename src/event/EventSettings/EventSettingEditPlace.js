import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {FaEdit} from 'react-icons/lib/fa';
import {Link} from 'react-router-dom';
import {selectEventId} from '../activeEventSelectors_old';
import Button from '../../components/Button/Button';

const EventSettingEditPlace = props => (
  <Button
    icon={<FaEdit color="white" size={16} />}
  >
    <Link to={`/${props.eventId}/edit`}>Edit Destination</Link>
  </Button>
);

EventSettingEditPlace.propTypes = {
  eventId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  eventId: selectEventId(state)
});

export default connect(
  mapStateToProps
)(EventSettingEditPlace);