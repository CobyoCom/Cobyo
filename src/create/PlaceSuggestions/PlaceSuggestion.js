import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {selectPlace} from '../createActions';

const PlaceSuggestion = props => (
  <div
    role="button"
    tabIndex={0}
    className="PlaceSuggestion"
    onClick={props.onClick}
  >
    {props.placeName}
  </div>
);

PlaceSuggestion.propTypes = {
  placeId: PropTypes.string.isRequired,
  placeName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(selectPlace(ownProps.placeName, ownProps.placeId))
});

export default connect(
  null,
  mapDispatchToProps
)(PlaceSuggestion);