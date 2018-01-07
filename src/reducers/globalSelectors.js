import * as loginReducer from '../login/loginReducer';
import * as loginSelectors from '../login/loginSelectors';

// Login app state reducer selectors
export const selectFacebookToken = state => loginSelectors.selectFacebookToken(state[loginReducer.moduleName]);