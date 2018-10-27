import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import { selectPlace } from '../createEventActions';

const getFormattedName = name => name && name.split(',')[0];

const PlaceSuggestion = props => (
  <div className="PlaceSuggestion">
    <Button onClick={props.onClick} size="small" variation="secondary">
      {getFormattedName(props.placeName)}
    </Button>
  </div>
);

PlaceSuggestion.propTypes = {
  placeId: PropTypes.string.isRequired,
  placeName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: e => {
    e.preventDefault();
    dispatch(selectPlace(ownProps.placeName, ownProps.placeId));
  }
});

export default connect(null, mapDispatchToProps)(PlaceSuggestion);
