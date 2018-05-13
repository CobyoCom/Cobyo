import React, {Component} from 'react';
import {getItem} from '../../helpers/localStorage'
import PlaceSuggestion from './PlaceSuggestion';
import './PlaceSuggestions.css';

class PlaceSuggestionsContainer extends Component {

  state = {
    places: []
  };

  componentDidMount() {
    const localStoragePlaces = getItem('places', true);
    // Take places object and turn it into an ordered an array by time
    const places = Object.keys(localStoragePlaces).reduce((places, placeName) => {
      places.push({
        ...localStoragePlaces[placeName],
        placeName
      });

      return places;
    }, []);

    places.sort((a, b) => {
      return b.eventTime - a.eventTime;
    });

    this.setState({places});
  }

  render() {
    if (!this.state.places.length) {
      return null;
    }

    return (
      <div className="PlaceSuggestions">
        <h3 className="PlaceSuggestions-header">Suggestions</h3>
        {this.state.places.map(place =>
          <PlaceSuggestion
            key={place.placeName}
            {...place}
          />
        )}
      </div>
    );
  }
}

export default PlaceSuggestionsContainer;