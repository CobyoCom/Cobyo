import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
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
    placeValue: PropTypes.string.isRequired,
    onChangePlace: PropTypes.func.isRequired,
    onSelectPlace: PropTypes.func.isRequired,
    isGoogleAPILoaded: PropTypes.bool.isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Where to?'
  };

  state = {
    showDefaultSearch: false
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
    value: this.props.placeValue,
    onChange: this.props.onChangePlace,
    placeholder: this.props.placeholder
  });

  getPlacesAutocompleteClassNames = () => ({
    root: 'PlacesAutocomplete-root',
    input: 'PlacesAutocomplete-input',
    autocompleteContainer: 'PlacesAutocomplete-autocompleteContainer',
    autocompleteItem: 'PlacesAutocomplete-autocompleteItem',
    autocompleteItemActive: 'PlacesAutocomplete-autocompleteItemActive'
  });

  render() {
    return (
      <div className="PlacesAutocomplete-wrapper">
        {this.showDefaultSearch() && <input placeholder={this.props.placeholder} />}
        {this.showLoadingPlacesAutocomplete() && <PlacesAutocompleteSkeleton/>}
        {this.showPlacesAutocomplete() && (
          <PlacesAutocomplete
            inputProps={this.getPlacesAutocompleteInputProps()}
            classNames={this.getPlacesAutocompleteClassNames()}
            onSelect={this.props.onSelectPlace}
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
  initGoogleMapsAPI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesAutocompleteContainer);
