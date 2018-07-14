import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cx from 'classnames';
import {selectPlace} from '../createActions';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';
import {selectPlaceName} from '../createEventFormSelectors';

import PlacesAutocomplete from 'react-places-autocomplete';
import Button from "../../components/Button/Button";
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
    initGoogleMapsAPI: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool,
    onExpand: PropTypes.func
  };

  static defaultProps = {
    placeholder: 'Where to?',
    placeName: '',
    autoFocus: false,
    onExpand() {}
  };

  state = {
    isExpanded: false,
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

  showPlacesAutocompleteSkeleton = () => !this.showDefaultSearch() && !this.state.isGoogleAPILoaded;

  showPlacesAutocomplete = () => !this.showDefaultSearch() && this.state.isGoogleAPILoaded;

  handleChangeName = (placeName) => this.setState({placeName});

  handleExpandToggle = this.props.onExpand;

  render() {
    return (
      <div
        className="PlacesAutocomplete-wrapper"
        onClick={this.handleExpandToggle}
      >
        {this.showDefaultSearch() && <input placeholder={this.props.placeholder} />}
        {this.showPlacesAutocompleteSkeleton() && <PlacesAutocompleteSkeleton/>}
        {this.showPlacesAutocomplete() && (
          <PlacesAutocomplete
            value={this.state.placeName}
            onChange={this.handleChangeName}
            onSelect={this.props.selectPlace}
          >
            {({getInputProps, suggestions, getSuggestionItemProps}) => (
              <div className="PlacesAutocomplete-root">
                <input
                  {...getInputProps({
                    placeholder: 'Where to?',
                    className: 'PlacesAutocomplete-input',
                    autoFocus: this.props.autoFocus
                  })}
                />
                <div className={cx('PlacesAutocomplete-autocompleteContainer', {
                  'PlacesAutocomplete-autocompleteContainer--nonEmpty': suggestions.length > 0
                })}>
                  {suggestions.map(suggestion =>
                    <div {...getSuggestionItemProps(suggestion, {className: 'PlacesAutocomplete-autocompleteItem'})}>
                      <Button
                        variation="secondary"
                        size="small"
                      >
                        <div className="PlacesAutocomplete-autocompleteItem-content">
                          <div className="PlacesAutocomplete-autocompleteItem-mainText">{suggestion.formattedSuggestion.mainText}</div>
                          <div className="PlacesAutocomplete-autocompleteItem-secondaryText">{suggestion.formattedSuggestion.secondaryText}</div>
                        </div>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
