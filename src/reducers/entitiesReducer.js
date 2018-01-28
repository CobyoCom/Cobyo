import {combineReducers} from 'redux';
import eventsReducer, {moduleName as eventsModuleName} from './entities/eventsReducer';

export default combineReducers({
  [eventsModuleName]: eventsReducer
});