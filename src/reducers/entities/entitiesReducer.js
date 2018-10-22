import { combineReducers } from "redux";
import eventsReducer, { moduleName as eventsModuleName } from "./eventsReducer";
import notificationsReducer, {
  moduleName as notificationsModuleName
} from "../../event/notifications/notificationsReducer";
import notificationReactionsReducer, {
  moduleName as notificationReactionsModuleName
} from "../../event/notifications/reactionsReducer";
import attendeesReducer, {
  moduleName as attendeesModuleName
} from "../../event/attendees/attendeesReducer";

export default combineReducers({
  [eventsModuleName]: eventsReducer,
  [notificationsModuleName]: notificationsReducer,
  [notificationReactionsModuleName]: notificationReactionsReducer,
  [attendeesModuleName]: attendeesReducer
});
