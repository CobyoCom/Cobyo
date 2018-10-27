/*global google*/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import AttendeeVisualizationContainer from "./AttendeeVisualizationContainer";
import { initGoogleMapsAPI } from "../../actions/googleMapsActions";
import {
  selectUserCoordinates,
  selectZoomLevel
} from "../../reducers/appState/appStateSelectors";
import {
  selectActiveEventOtherAttendeesList,
  selectActiveEventMe,
  selectActiveEventGooglePlaceId
} from "../activeEventSelectors";
import MeVisualizationContainer from "./MeVisualizationContainer";
import DestinationVisualizationContainer from "./DestinationVisualizationContainer";
import ZoomControls from "./ZoomControls/ZoomControls";

class EventVisualization extends Component {
  static propTypes = {
    me: PropTypes.shape(AttendeePropTypes),
    attendees: PropTypes.array.isRequired,
    placeId: PropTypes.string.isRequired,
    userCoordinates: PropTypes.object.isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired,
    zoomLevel: PropTypes.number.isRequired
  };

  state = {
    eventCoordinates: null
  };

  async componentDidMount() {
    try {
      await this.props.initGoogleMapsAPI();
      const { latitude, longitude } = await this.geocode();
      this.setState({
        eventCoordinates: {
          latitude,
          longitude
        }
      });
    } catch (error) {}
  }

  geocode = () =>
    new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      return geocoder.geocode(
        { placeId: this.props.placeId },
        (results, status) => {
          if (status === "OK") {
            if (results[0]) {
              const position = results[0].geometry.location;
              return resolve({
                latitude: position.lat(),
                longitude: position.lng()
              });
            } else {
              return reject();
            }
          } else {
            return reject();
          }
        }
      );
    });

  getBoundingWidth = () =>
    this.el ? this.el.getBoundingClientRect().width : 0;

  getBoundingHeight = () => 400;

  render() {
    return (
      <Fragment>
        <svg
          width="100%"
          height={this.getBoundingHeight()}
          ref={el => (this.el = el)}
        >
          {this.el && (
            <Fragment>
              <DestinationVisualizationContainer
                boundingWidth={this.getBoundingWidth()}
                boundingHeight={this.getBoundingHeight()}
                zoomLevel={this.props.zoomLevel}
              />
              {this.props.attendees.map(attendee => (
                <AttendeeVisualizationContainer
                  key={attendee.user.name}
                  boundingWidth={this.getBoundingWidth()}
                  boundingHeight={this.getBoundingHeight()}
                  zoomLevel={this.props.zoomLevel}
                  {...attendee}
                />
              ))}
              <MeVisualizationContainer
                {...this.props.me}
                boundingWidth={this.getBoundingWidth()}
                boundingHeight={this.getBoundingHeight()}
                zoomLevel={this.props.zoomLevel}
              />
            </Fragment>
          )}
        </svg>
        <ZoomControls />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectActiveEventOtherAttendeesList(state),
  me: selectActiveEventMe(state),
  placeId: selectActiveEventGooglePlaceId(state),
  userCoordinates: selectUserCoordinates(state),
  zoomLevel: selectZoomLevel(state)
});

const mapDispatchToProps = {
  initGoogleMapsAPI
};

export default connect(mapStateToProps, mapDispatchToProps)(EventVisualization);
