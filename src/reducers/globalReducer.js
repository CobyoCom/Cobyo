import { combineReducers } from "redux";
import activeEventReducer, {
  moduleName as activeEventModuleName
} from "../event/activeEventReducer";
import uiReducer from "./ui/uiReducer";
import entitiesReducer from "./entities/entitiesReducer";
import appStateReducer from "./appState/appStateReducer";
import meReducer from "../me/meReducer";

export default combineReducers({
  [activeEventModuleName]: activeEventReducer,
  ui: uiReducer,
  entities: entitiesReducer,
  appState: appStateReducer,
  me: meReducer
});
