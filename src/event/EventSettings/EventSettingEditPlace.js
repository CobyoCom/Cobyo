import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaEdit } from "react-icons/lib/fa";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { selectActiveEventCode } from "../activeEventSelectors";

const EventSettingEditPlace = props => (
  <Button icon={<FaEdit color="white" size={16} />}>
    <Link to={`/${props.code}/edit`}>Edit Destination</Link>
  </Button>
);

EventSettingEditPlace.propTypes = {
  code: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  code: selectActiveEventCode(state)
});

export default connect(mapStateToProps)(EventSettingEditPlace);
