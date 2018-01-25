import {combineReducers} from 'redux';
import eventReducer, {moduleName as eventModuleName} from '../event/eventReducer';
import errorReducer, {moduleName as errorModuleName}  from '../error/errorReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  [eventModuleName]: eventReducer,
  [errorModuleName]: errorReducer,
  ui: uiReducer
});