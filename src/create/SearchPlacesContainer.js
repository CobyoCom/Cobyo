import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {init} from '../helpers/googlemaps';
import PlacesAutocomplete from 'react-places-autocomplete'

class SearchPlacesContainer extends Component {
  static propTypes = {
    placeholder: PropTypes.string,

  };

  static defaultProps = {
    placeholder: 'Where to?'
  };

  state = {
    isLoadingGoogleMaps: true,
    showDefaultSearch: false,
    placeText: ''
  };

  componentDidMount() {
    init()
      .then(() => this.setState({isLoadingGoogleMaps: false}))
      .catch(() => this.setState({showDefaultSearch: true}));
  }

  showDefaultSearch = () => this.state.showDefaultSearch;
  showLoadingPlacesAutocomplete = () => !this.showDefaultSearch() && this.state.isLoadingGoogleMaps;
  showPlacesAutocomplete = () => !this.showDefaultSearch() && !this.state.isLoadingGoogleMaps;

  handleChangePlacesInput = placeText => this.setState({ placeText });

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
              value: this.state.placeText,
              onChange: this.handleChangePlacesInput,
              placeholder: this.props.placeholder
            }}
          />
        }
      </div>
    );
  }
}

export default SearchPlacesContainer;
