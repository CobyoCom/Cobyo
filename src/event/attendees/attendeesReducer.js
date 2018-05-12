import {AttendeeDefaultProps} from './AttendeesListItem/AttendeesListItem';
import {types} from '../eventUserActions';

export const moduleName = 'attendees';

const initialState = {};

export default function attendees(state = initialState, {type, payload}) {
  switch(type) {
    case types.getAttendeesSuccess: {
      const {attendees} = payload;
      return attendees.reduce((byId, attendee) => {
        byId[attendee.id] = {
          ...AttendeeDefaultProps,
          ...byId[attendee.id],
          ...attendee
        };

        return byId;
      }, {...state});
    }
    default:
      return state;
  }
}
