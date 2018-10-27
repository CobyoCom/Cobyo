import { moduleName } from "./uiEventReducer";

function selectUiEvent(state) {
  return state.ui[moduleName];
}

export function selectIsCalculatingDuration(state) {
  return selectUiEvent(state).isCalculatingDuration;
}

export function selectShouldShowTravelModeSelect(state) {
  return selectUiEvent(state).shouldShowTravelModeSelect;
}
