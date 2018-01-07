import types from './loginActionTypes';

const facebookLoginRequest = () => ({
  type: types.facebookLoginRequest
});

const facebookLoginSuccess = (facebookToken) => ({
  type: types.facebookLoginSuccess,
  payload: {facebookToken}
});

const facebookLoginFailure = () => ({
  type: types.facebookLoginFailure
});

// Login thunk
export const facebookLogin = (FB) => (dispatch) => new Promise((resolve, reject) => {
  dispatch(facebookLoginRequest());

  FB.login(response => {
    if (response.status === 'connected') {
      const {authResponse: {accessToken}} = response;
      localStorage.setItem('facebookToken', accessToken);
      dispatch(facebookLoginSuccess(accessToken));
      resolve();
    } else {
      dispatch(facebookLoginFailure());
      reject();
    }
  }, {scope: 'public_profile,email,user_friends'});
});