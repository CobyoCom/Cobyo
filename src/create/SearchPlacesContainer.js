import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {init} from '../helpers/googlemaps';
import PlacesAutocomplete from 'react-places-autocomplete'

class SearchPlacesContainer extends Component {
  static propTypes = {
    placeholder: PropTypes.string,
    placeValue: PropTypes.string.isRequired,
    onChangePlace: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Where to?'
  };

  state = {
    isLoadingGoogleMaps: true,
    showDefaultSearch: false
  };

  componentDidMount() {
    init()
      .then(() => this.setState({isLoadingGoogleMaps: false}))
      .catch(() => this.setState({showDefaultSearch: true}));
  }

  showDefaultSearch = () => this.state.showDefaultSearch;

  showLoadingPlacesAutocomplete = () => !this.showDefaultSearch() && this.state.isLoadingGoogleMaps;

  showPlacesAutocomplete = () => !this.showDefaultSearch() && !this.state.isLoadingGoogleMaps;

  render() {
    return (
      <div className="PlaceAutocomplete-wrapper">
        {this.showDefaultSearch() &&
          <input
            placeholder={this.props.placeholder}
          />
        }
        {this.showLoadingPlacesAutocomplete() && <div>Loading</div>}
        {this.showPlacesAutocomplete() &&
          <PlacesAutocomplete
            inputProps={{
              value: this.props.placeValue,
              onChange: this.props.onChangePlace,
              placeholder: this.props.placeholder
            }}
          />
        }
      </div>
    );
  }
}

export default SearchPlacesContainer;
