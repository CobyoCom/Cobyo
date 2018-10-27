import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/Button/Button';
import PlacesAutocompleteContainer from '../PlacesAutocomplete/PlacesAutocompleteContainer';
import PlaceSuggestionsContainer from '../PlaceSuggestions/PlaceSuggestionsContainer';
import NavBar from '../../navigation/NavBar/NavBar';
import './CreateEventPage.css';

const CreateEventPage = props => (
  <div className="CreateEventPage">
    <form className="EventCreateForm" onSubmit={() => {}}>
      <PlacesAutocompleteContainer autoFocus />
      {!props.disabled && <PlaceSuggestionsContainer />}
      <Button onClick={props.onSubmit} disabled={props.disabled}>
        Continue
      </Button>
    </form>
    <NavBar activeTab="Events"/>
  </div>
);

CreateEventPage.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CreateEventPage;
