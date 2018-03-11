import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';
import {selectIsGoogleAPILoaded} from '../../reducers/appState/appStateSelectors';
import PlacesAutocomplete from 'react-places-autocomplete';
import './PlacesAutocomplete.css';

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

  render() {
    return (
      <div className="PlacesAutocomplete-wrapper">
        {this.showDefaultSearch() &&
          <input placeholder={this.props.placeholder} />
        }
        {this.showLoadingPlacesAutocomplete() && <div>Loading</div>}
        {this.showPlacesAutocomplete() &&
          <PlacesAutocomplete
            inputProps={{
              value: this.props.placeValue,
              onChange: this.props.onChangePlace,
              placeholder: this.props.placeholder
            }}
            classNames={{
              root: 'PlacesAutocomplete-root',
              input: 'PlacesAutocomplete-input',
              autocompleteContainer: 'PlacesAutocomplete-autocompleteContainer',
              autocompleteItem: 'PlacesAutocomplete-autocompleteItem',
              autocompleteItemActive: 'PlacesAutocomplete-autocompleteItemActive'
            }}
            onSelect={this.props.onSelectPlace}
          />
        }
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
