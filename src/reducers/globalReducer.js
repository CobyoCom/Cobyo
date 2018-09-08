import { combineReducers } from 'redux';
import activeEventReducer, {
  moduleName as activeEventModuleName
} from '../event/activeEventReducer';
import uiReducer from './ui/uiReducer';
import entitiesReducer from './entities/entitiesReducer';
import appStateReducer from './appState/appStateReducer';

export default combineReducers({
  [activeEventModuleName]: activeEventReducer,
  ui: uiReducer,
  entities: entitiesReducer,
  appState: appStateReducer
});
