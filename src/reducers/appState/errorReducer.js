import {types as eventActionTypes} from '../../event/eventUserActions';
import {types as notificationActionTypes} from '../../event/notifications/notificationsActions';
import {types as errorBannerActionTypes} from '../../error/errorBannerActions';
import {types as createActionTypes} from '../../create/createActions';
import {types as googleMapsActionTypes} from '../../actions/googleMapsActions';

export default function error(state = null, {type}) {
  switch (type) {
    case errorBannerActionTypes.clearError: {
      return null;
    }
    case eventActionTypes.refreshEventFailure: {
      return 'Something went wrong. Please try again.';
    }
    case eventActionTypes.getAttendeesFailure: {
      return 'Unable to load attendees. Please try again.';
    }
    case eventActionTypes.leaveForEventFailure: {
      return 'Unable to register action. Please try again.';
    }
    case eventActionTypes.fetchTravelDurationFailure: {
      return 'Unable to calculate travel duration. Please try again.';
    }
    case notificationActionTypes.fetchNotificationsFailure: {
      return 'Unable to fetch notifications for event. Please try again.';
    }
    case createActionTypes.createEventFailure: {
      return 'Unable to create event. Please try again.';
    }
    case googleMapsActionTypes.initGoogleMapsAPIFailure: {
      return 'Unable to load Google Maps API. Please try again.';
    }
    default:
      return state;
  }
}
