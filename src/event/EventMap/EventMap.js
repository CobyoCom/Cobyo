/*global google*/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import {initGoogleMapsAPI} from '../../actions/googleMapsActions';

class EventMap extends Component {

  static propTypes = {
    initGoogleMapsAPI: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.loadMap();
  }

  loadMap = async () => {
    await this.props.initGoogleMapsAPI();
    const maps = google.maps;
    const mapRef = this.refs.map;
    const node = ReactDOM.findDOMNode(mapRef);

    const mapConfig = Object.assign({}, {
      center: {lat: 40.7485722, lng: -74.0068633}, // sets center of google map to NYC.
      zoom: 5, // sets zoom. Lower numbers are zoomed further out.
      mapTypeId: 'roadmap' // optional main map layer. Terrain, satellite, hybrid or roadmap--if unspecified, defaults to roadmap.
    });

    this.map = new maps.Map(node, mapConfig); // creates a new Google map on the specified node (ref='map') with the specified configuration set above.
  };

  render() {
    const style = { // MUST specify dimensions of the Google map or it will not work. Also works best when style is specified inside the render function and created as an object
      height: '25vh',
      position: 'relative',
      overflow: 'hidden',
      margin: '0 10px',
      borderRadius: '5px'
    };

    return (
      <div ref="map" style={style}>
        loading map...
      </div>
    );
  }
}

const mapDispatchToProps = {
  initGoogleMapsAPI
};

export default connect(
  null,
  mapDispatchToProps
)(EventMap);