/*global google*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {selectPlaceId} from '../activeEventSelectors';
import {selectUserCoordinates} from '../../reducers/appState/appStateSelectors';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';

class EventMap extends Component {
  static propTypes = {
    placeId: PropTypes.string.isRequired,
    userCoordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      lastUpdated: PropTypes.number
    }).isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired
  };

  async componentDidMount() {
    try {
      await this.props.initGoogleMapsAPI();
      this.map = this.getMap();
      const eventCoordinates = await this.geocodeMap(this.map, this.props.placeId);
      this.setState({eventCoordinates});
    } catch(error) {
      this.setState({isMapError: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    const didUserCoordinatesUpdate = this.props.userCoordinates.lastUpdated !== nextProps.userCoordinates.lastUpdated;
    const isEventCoordinatesLoaded = !!this.state.eventCoordinates;

    if (didUserCoordinatesUpdate && isEventCoordinatesLoaded) {
      this.boundMap(this.map, nextProps.userCoordinates, this.state.eventCoordinates);
    }
  }

  state = {
    eventCoordinates: null,
    isMapError: false
  };

  getMap = () => {
    const maps = google.maps;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);
    const mapConfig = {
      zoomControl: true,
      fullscreenControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false
    };
    return new maps.Map(node, mapConfig);
  };

  geocodeMap = (map, placeId) => new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();

    return geocoder.geocode({'placeId': placeId}, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          map.setZoom(15);
          map.setCenter(results[0].geometry.location);
          const position = results[0].geometry.location;
          new google.maps.Marker({map, position});

          return resolve({
            latitude: position.lat(),
            longitude: position.lng()
          });
        } else {
          window.alert('No results found');
          return reject();
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
        return reject();
      }
    });
  });

  boundMap = (map, {latitude: userLat, longitude: userLng}, eventCoordinates = {latitude: 0, longitude: 0}) => {
    const {latitude: eventLat, longitude: eventLng} = eventCoordinates;
    console.log(userLat, userLng);
    new google.maps.Marker({map, position: {lat: userLat, lng: userLng}});
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({lat: userLat, lng: userLng});
    bounds.extend({lat: eventLat, lng: eventLng});
    map.fitBounds(bounds);
  };

  render() {
    const style = {
      height: '20vh',
      position: 'relative',
      overflow: 'hidden',
      margin: '0 10px',
      borderRadius: '5px'
    };
    const skeletonStyle = {...style};

    return (
      <div ref="map" style={style}>
        <div style={skeletonStyle}/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeId: selectPlaceId(state),
  userCoordinates: selectUserCoordinates(state)
});

const mapDispatchToProps = {
  initGoogleMapsAPI
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMap);