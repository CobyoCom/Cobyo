import { types } from '../../event/eventUserActions';
import {types as visulizationTypes } from '../../event/EventVisualization/visualizationActions';
import {combineReducers} from 'redux';

export const moduleName = 'uiEvent';

function isRefreshing(state = false, {type, payload}) {
  switch (type) {
    case types.refreshEventRequest: {
      return true;
    }
    case types.refreshEventSuccess:
    case types.refreshEventFailure: {
      return false;
    }
    default:
      return state;
  }
}

function zoomLevel(state = 3, {type}) {
  switch (type) {
    case visulizationTypes.incrementZoomLevel:
      return state + 1;
    case visulizationTypes.decrementZoomLevel:
      return Math.max(1, state - 1);
    default:
      return state;
  }
}

export default combineReducers({
  isRefreshing,
  zoomLevel
});