import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import PlacesAutocompleteContainer from '../PlacesAutocomplete/PlacesAutocompleteContainer';
import PlaceSuggestionsContainer from '../PlaceSuggestions/PlaceSuggestionsContainer';
import NavBar from '../../navigation/NavBar/NavBar';
import './CreatePage.css';

const CreatePage = props => (
  <div className="CreatePage">
    <form
      className="EventCreateForm"
      onSubmit={() => {}}
    >
      <PlacesAutocompleteContainer
        autoFocus
      />
      <PlaceSuggestionsContainer/>
      <Button
        onClick={props.onSubmit}
        disabled={props.disabled}
      >
        Continue
      </Button>
    </form>
    <NavBar activeTab="Create"/>
  </div>
);

CreatePage.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CreatePage;