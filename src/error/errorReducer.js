import {types} from '../event/eventActions';

export const moduleName = 'error';

export default function(state = '', {type, payload}) {
  switch(type) {
    case types.fetchETAFailure: {
      const {errorMessage} = payload;
      return errorMessage;
    }
    default:
      return state;
  }
}