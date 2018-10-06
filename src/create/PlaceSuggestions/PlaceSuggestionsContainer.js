import React, { Component } from 'react';
import { getItem } from '../../helpers/localStorage';
import PlaceSuggestion from './PlaceSuggestion';
import './PlaceSuggestions.css';

class PlaceSuggestionsContainer extends Component {
  state = {
    places: []
  };

  componentDidMount() {
    const localStoragePlaces = getItem('places', true);
    // Take places object and turn it into an ordered an array by time
    const places = Object.keys(localStoragePlaces).reduce(
      (places, placeName) => {
        if (!localStoragePlaces[placeName] || !localStoragePlaces[placeName].placeId) {
          return places;
        }
        places.push({
          ...localStoragePlaces[placeName],
          placeName
        });

        return places;
      },
      []
    );

    this.setState({ places });
  }

  render() {
    if (!this.state.places.length) {
      return null;
    }

    return (
      <div className="PlaceSuggestions">
        <h3 className="PlaceSuggestions-header">Suggestions</h3>
        {this.state.places
          .reverse()
          .slice(0, 5)
          .map(place => <PlaceSuggestion key={place.placeName} {...place} />)}
      </div>
    );
  }
}

export default PlaceSuggestionsContainer;
