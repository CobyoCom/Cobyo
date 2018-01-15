import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import SearchPlacesContainer from '../../create/SearchPlacesContainer';

const CreateEventForm = props => (
  <form
    className="CreateForm"
    onSubmit={() => {}}
  >
    <SearchPlacesContainer
      placeValue={props.placeValue}
      onChangePlace={props.onChangePlace}
      onSelectPlace={props.onSelectPlace}
    />
    <Button onClick={props.onSubmit}>
      Submit
    </Button>
  </form>
);

CreateEventForm.propTypes = {
  placeValue: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangePlace: PropTypes.func.isRequired,
  onSelectPlace: PropTypes.func.isRequired
};

export default CreateEventForm;