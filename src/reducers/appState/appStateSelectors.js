export const selectIsGoogleAPILoaded = state =>
  state.appState.isGoogleAPILoaded;
export const selectErrorMessage = state => state.appState.error;
export const selectUserCoordinates = state => state.appState.position;
export const selectZoomLevel = state => state.appState.zoomLevel;