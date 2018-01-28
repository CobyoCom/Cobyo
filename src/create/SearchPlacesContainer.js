import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {init} from '../helpers/googlemaps';
import PlacesAutocomplete from 'react-places-autocomplete';


class SearchPlacesContainer extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    placeValue: PropTypes.string.isRequired,
    onChangePlace: PropTypes.func.isRequired,
    onSelectPlace: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Where to?'
  };

  state = {
    isLoadingGoogleMaps: true,
    showDefaultSearch: false
  };

  async componentDidMount() {
    try {
      await init();
      this.setState({isLoadingGoogleMaps: false})
    } catch(error) {
      this.setState({showDefaultSearch: true});
    }
  }

  showDefaultSearch = () => this.state.showDefaultSearch;

  showLoadingPlacesAutocomplete = () => !this.showDefaultSearch() && this.state.isLoadingGoogleMaps;

  showPlacesAutocomplete = () => !this.showDefaultSearch() && !this.state.isLoadingGoogleMaps;

  render() {
    const cssClasses = {
      root: 'PlaceAutocomplete-root',
      input: 'PlaceAutocomplete-root',
      autocompleteContainer: 'PlaceAutocomplete-root',
      autocompleteItem: 'PlaceAutocomplete-root',
      autocompleteItemActive: 'PlaceAutocomplete-root'
    };

    return (
      <div className="PlaceAutocomplete-wrapper">
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
            onSelect={this.props.onSelectPlace}
          />
        }
      </div>
    );
  }
}

export default SearchPlacesContainer;
