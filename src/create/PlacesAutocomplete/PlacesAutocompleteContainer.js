import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {selectPlace} from '../createActions';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';
import {selectPlaceName} from '../createEventFormSelectors';
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
    placeName: PropTypes.string,
    selectPlace: PropTypes.func.isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired
  };

  static defaultProps = {
    placeholder: 'Where to?',
    placeName: ''
  };

  state = {
    isGoogleAPILoaded: false,
    showDefaultSearch: false,
    placeName: this.props.placeName
  };

  async componentDidMount() {
    try {
      await this.props.initGoogleMapsAPI();
      this.setState({isGoogleAPILoaded: true});
    } catch(error) {
      this.setState({showDefaultSearch: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placeName !== this.state.placeName) {
      this.setState({placeName: nextProps.placeName});
    }
  }

  showDefaultSearch = () => this.state.showDefaultSearch;

  showLoadingPlacesAutocomplete = () => !this.showDefaultSearch() && !this.state.isGoogleAPILoaded;

  showPlacesAutocomplete = () => !this.showDefaultSearch() && this.state.isGoogleAPILoaded;

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
  placeName: selectPlaceName(state)
});

const mapDispatchToProps = {
  selectPlace,
  initGoogleMapsAPI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesAutocompleteContainer);
