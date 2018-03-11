import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../navigation/NavBar/NavBar';
import EventCreateForm from '../CreateForm/EventCreateForm';

const CreatePage = props => (
  <div className="CreatePage">
    <EventCreateForm
      placeValue={props.placeValue}
      disabled={props.disabled}
      onSubmit={props.onSubmit}
      onSelectPlace={props.onSelectPlace}
      onChangePlace={props.onChangePlace}
    />
    <NavBar/>
  </div>
);

CreatePage.propTypes = {
  placeValue: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onSelectPlace: PropTypes.func.isRequired,
  onChangePlace: PropTypes.func.isRequired
};

CreatePage.defaultProps = {
  placeValue: null,
  disabled: true
};

export default CreatePage;