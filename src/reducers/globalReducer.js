import {combineReducers} from 'redux';
import loginReducer, {moduleName as loginModuleName} from '../login/loginReducer';
export default combineReducers({
  [loginModuleName]: loginReducer
});