import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectPlace} from '../createActions';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';
import {selectIsGoogleAPILoaded} from '../../reducers/appState/appStateSelectors';
import PlacesAutocomplete from 'react-places-autocomplete';
import './PlacesAutocomplete.css';

const PlacesAutocompleteSkeleton = () => (
  <div className="PlacesAutocomplete-root">
    <input
      className="PlacesAutocomplete-input"
      disabled
      placeholder="Loading..."
    />
  </div>
);

class PlacesAutocompleteContainer extends Component {

  static propTypes = {
    placeholder: PropTypes.string,
    selectPlace: PropTypes.func.isRequired,
    isGoogleAPILoaded: PropTypes.bool.isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Where to?'
  };

  state = {
    showDefaultSearch: false,
    placeName: ''
  };

  componentDidMount() {
    try {
      if (!this.props.isGoogleAPILoaded) {
        this.props.initGoogleMapsAPI();
      }
    } catch(error) {
      this.setState({showDefaultSearch: true});
    }
  }

  showDefaultSearch = () => this.state.showDefaultSearch;

  showLoadingPlacesAutocomplete = () => !this.showDefaultSearch() && !this.props.isGoogleAPILoaded;

  showPlacesAutocomplete = () => !this.showDefaultSearch() && this.props.isGoogleAPILoaded;

  getPlacesAutocompleteInputProps = () => ({
    value: this.state.placeName,
    onChange: this.handleChangeName,
    placeholder: this.props.placeholder
  });

  getPlacesAutocompleteClassNames = () => ({
    root: 'PlacesAutocomplete-root',
    input: 'PlacesAutocomplete-input',
    autocompleteContainer: 'PlacesAutocomplete-autocompleteContainer',
    autocompleteItem: 'PlacesAutocomplete-autocompleteItem',
    autocompleteItemActive: 'PlacesAutocomplete-autocompleteItemActive'
  });

  handleChangeName = (placeName) => this.setState({placeName});

  render() {
    return (
      <div className="PlacesAutocomplete-wrapper">
        {this.showDefaultSearch() && <input placeholder={this.props.placeholder} />}
        {this.showLoadingPlacesAutocomplete() && <PlacesAutocompleteSkeleton/>}
        {this.showPlacesAutocomplete() && (
          <PlacesAutocomplete
            inputProps={this.getPlacesAutocompleteInputProps()}
            classNames={this.getPlacesAutocompleteClassNames()}
            onSelect={this.props.selectPlace}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isGoogleAPILoaded: selectIsGoogleAPILoaded(state)
});

const mapDispatchToProps = {
  selectPlace,
  initGoogleMapsAPI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesAutocompleteContainer);
