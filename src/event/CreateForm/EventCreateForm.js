import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import PlacesAutocompleteContainer from '../PlacesAutocomplete/PlacesAutocompleteContainer';
import './EventCreateForm.css';

const EventCreateForm = props => (
  <form
    className="EventCreateForm"
    onSubmit={() => {}}
  >
    <PlacesAutocompleteContainer
      placeValue={props.placeValue}
      onChangePlace={props.onChangePlace}
      onSelectPlace={props.onSelectPlace}
    />
    <Button
      onClick={props.onSubmit}
      disabled={props.disabled}

    >
      Continue
    </Button>
  </form>
);

EventCreateForm.propTypes = {
  placeValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangePlace: PropTypes.func.isRequired,
  onSelectPlace: PropTypes.func.isRequired
};

export default EventCreateForm;