import {combineReducers} from 'redux';
import eventReducer, {moduleName as eventModuleName} from '../event/eventReducer';

export default combineReducers({
  [eventModuleName]: eventReducer
});