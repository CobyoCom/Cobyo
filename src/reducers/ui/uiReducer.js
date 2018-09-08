import { combineReducers } from 'redux';
import uiEventReducer, {
  moduleName as uiEventModuleName
} from './uiEventReducer';

export default combineReducers({
  [uiEventModuleName]: uiEventReducer
});
