/*global google*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {selectPlaceId} from '../activeEventSelectors';
import {selectIsGoogleAPILoaded, selectUserCoordinates} from '../../reducers/appState/appStateSelectors';
import {initGoogleMapsAPI, geocodeMap} from '../../actions/googleMapsActions';

class EventMap extends Component {
  static propTypes = {
    isGoogleAPILoaded: PropTypes.bool.isRequired,
    placeId: PropTypes.string.isRequired,
    userCoordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      lastUpdated: PropTypes.number
    }).isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired,
    geocodeMap: PropTypes.func.isRequired
  };

  componentDidMount() {
    try {
      if (!this.props.isGoogleAPILoaded) {
        this.props.initGoogleMapsAPI();
      }
    } catch(error) {

    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isGoogleAPILoaded && nextProps.isGoogleAPILoaded) {
      this.loadMap();
    } else if (this.props.userCoordinates.lastUpdated !== nextProps.userCoordinates.lastUpdated) {
      const {latitude: lat, longitude: lng} = nextProps.userCoordinates;
      new google.maps.Marker({
        map: this.map,
        position: {lat, lng}
      });

      const bounds = new google.maps.LatLngBounds();
      bounds.extend({lat, lng});
      bounds.extend({lat: this.state.eventCoordinates.latitude, lng: this.state.eventCoordinates.longitude});
      this.map.fitBounds(bounds);
    }
  }

  state = {
    eventCoordinates: null
  };

  loadMap = async () => {
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
    const map = new maps.Map(node, mapConfig);
    const geocoder = new google.maps.Geocoder();

    const eventCoordinates = await geocodeMap(geocoder, map, this.props.placeId);
    this.setState({eventCoordinates});
    this.map = map;
  };

  render() {
    const style = {
      height: '22vh',
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
  isGoogleAPILoaded: selectIsGoogleAPILoaded(state),
  placeId: selectPlaceId(state),
  userCoordinates: selectUserCoordinates(state)
});

const mapDispatchToProps = {
  initGoogleMapsAPI,
  geocodeMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMap);