import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import SearchPlacesContainer from '../../create/SearchPlacesContainer';
import './CreateEventForm.css';

const CreateEventForm = props => (
  <form
    className="CreateEventForm"
    onSubmit={() => {}}
  >
    <SearchPlacesContainer
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

CreateEventForm.propTypes = {
  placeValue: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangePlace: PropTypes.func.isRequired,
  onSelectPlace: PropTypes.func.isRequired
};

export default CreateEventForm;