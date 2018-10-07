export const types = {
  incrementZoomLevel: "INCREMENT_ZOOM_LEVEL",
  decrementZoomLevel: "DECREMENT_ZOOM_LEVEL",
  selectAttendee: "SELECT_ATTENDEE",
  deselectAttendee: "DESELECT_ATTENDEE"
};

export function incrementZoomLevel() {
  return { type: types.incrementZoomLevel };
}

export function decrementZoomLevel() {
  return { type: types.decrementZoomLevel };
}

export function selectAttendee(payload) {
  return { type: types.selectAttendee, payload };
}

export function deselectAttendee() {
  return { type: types.deselectAttendee };
}
