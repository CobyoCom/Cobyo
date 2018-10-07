/*global google*/

import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  selectEventAttendees,
  selectMe,
  selectPlaceId
} from "../activeEventSelectors";
import { AttendeePropTypes } from "../attendees/AttendeesListItem/AttendeesListItem";
import AttendeeVisualizationContainer from "./AttendeeVisualizationContainer";
import { initGoogleMapsAPI } from "../../actions/googleMapsActions";
import { selectUserCoordinates } from "../../reducers/appState/appStateSelectors";
import MeVisualizationContainer from "./MeVisualizationContainer";
import DestinationVisualizationContainer from "./DestinationVisualizationContainer";
import ZoomControls from "./ZoomControls/ZoomControls";

class EventVisualization extends Component {
  static propTypes = {
    me: PropTypes.shape(AttendeePropTypes),
    attendees: PropTypes.array.isRequired,
    placeId: PropTypes.string.isRequired,
    userCoordinates: PropTypes.object.isRequired,
    initGoogleMapsAPI: PropTypes.func.isRequired
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

  getBoundingHeight = () => 400;

  render() {
    return (
      <Fragment>
        <svg width="100%" height={this.getBoundingHeight()}>
          <DestinationVisualizationContainer
            boundingHeight={this.getBoundingHeight()}
          />
          <MeVisualizationContainer
            {...this.props.me}
            boundingHeight={this.getBoundingHeight()}
          />
          {this.props.attendees.map(attendee => (
            <AttendeeVisualizationContainer
              key={attendee.userName}
              boundingHeight={this.getBoundingHeight()}
              {...attendee}
            />
          ))}
        </svg>
        <ZoomControls/>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  attendees: selectEventAttendees(state),
  me: selectMe(state),
  placeId: selectPlaceId(state),
  userCoordinates: selectUserCoordinates(state)
});

const mapDispatchToProps = {
  initGoogleMapsAPI
};

export default connect(mapStateToProps, mapDispatchToProps)(EventVisualization);
