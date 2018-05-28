/*global google*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {selectPlaceId} from '../activeEventSelectors';
import {selectUserCoordinates} from '../../reducers/appState/appStateSelectors';
import {initGoogleMapsAPI, geocodeMap} from '../../actions/googleMapsActions';

class EventMap extends Component {

  static propTypes = {
    placeId: PropTypes.string.isRequired,
    userCoordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      lastUpdated: PropTypes.number.isRequired
    }).isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired,
    geocodeMap: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (this.props.placeId) {
      this.loadMap();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userCoordinates.lastUpdated !== state.userCoordinates.lastUpdated) {
      return {userCoordinates: props.userCoordinates};
    }
  }

  state = {
    userCoordinates: this.props.userCoordinates
  };

  loadMap = async () => {
    await this.props.initGoogleMapsAPI();
    const maps = google.maps;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);
    const map = new maps.Map(node);
    const geocoder = new google.maps.Geocoder();

    await geocodeMap(geocoder, map, this.props.placeId);
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