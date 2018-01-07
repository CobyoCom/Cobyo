import types from './loginActionTypes';

const initialState = {
  facebookToken: window.localStorage.getItem('facebookToken')
};

export const moduleName = 'login';

export default function(state = initialState, {type, payload}) {
  switch(type) {
    case types.facebookLoginSuccess: {
      const {facebookToken} = payload;
      return {
        ...state,
        facebookToken
      };
    }
    default:
      return state;
  }
}