import {combineReducers} from 'redux';
import uiEventReducer, {moduleName as uiEventModuleName} from './ui/uiEventReducer';

export default combineReducers({
  [uiEventModuleName]: uiEventReducer
});