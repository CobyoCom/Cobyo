import { types } from '../../event/eventUserActions';

export const moduleName = 'uiEvent';

const initialState = {
  isRefreshing: false
};

export default function uiEvent(state = initialState, { type, payload }) {
  switch (type) {
    case types.refreshEventRequest: {
      return {
        ...state,
        isRefreshing: true
      };
    }
    case types.refreshEventSuccess:
    case types.refreshEventFailure: {
      return {
        ...state,
        isRefreshing: false
      };
    }
    default:
      return state;
  }
}
