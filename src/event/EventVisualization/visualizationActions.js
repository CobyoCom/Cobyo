export const types = {
  incrementZoomLevel: "INCREMENT_ZOOM_LEVEL",
  decrementZoomLevel: "DECREMENT_ZOOM_LEVEL"
};

export function incrementZoomLevel() {
  return { type: types.incrementZoomLevel };
}

export function decrementZoomLevel() {
  return { type: types.decrementZoomLevel };
}
