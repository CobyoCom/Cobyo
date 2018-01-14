import {moduleName} from './loginReducer';
const selectLogin = state => state[moduleName];

export const selectFacebookToken = state => selectLogin(state).facebookToken;