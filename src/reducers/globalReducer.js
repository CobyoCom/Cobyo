import {combineReducers} from 'redux';
import activeEventReducer, {moduleName as activeEventModuleName} from '../event/activeEventReducer';
import errorReducer, {moduleName as errorModuleName}  from '../error/errorReducer';
import uiReducer from './uiReducer';
import entitiesReducer from './entitiesReducer';

export default combineReducers({
  [activeEventModuleName]: activeEventReducer,
  [errorModuleName]: errorReducer,
  ui: uiReducer,
  entities: entitiesReducer
});