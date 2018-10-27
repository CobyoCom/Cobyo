import { moduleName } from "./createEventFormReducer";

export function selectCreateEventForm(state) {
  return state.appState[moduleName];
}

export function selectPlaceId(state) {
  return selectCreateEventForm(state).placeId;
}

export function selectPlaceName(state) {
  return selectCreateEventForm(state).name;
}
