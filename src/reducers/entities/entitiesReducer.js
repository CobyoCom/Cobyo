import {combineReducers} from 'redux';
import eventsReducer, {moduleName as eventsModuleName} from './eventsReducer';
import eventNotificationsReducer, {moduleName as eventNotificationsModuleName} from '../../event/notifications/eventNotificationsReducer';
import eventNotificationReactionsReducer, {moduleName as eventNotificationReactionsModuleName} from '../../event/notifications/reactionsReducer';
import attendeesReducer, {moduleName as attendeesModuleName} from '../../event/attendees/attendeesReducer';

export default combineReducers({
  [eventsModuleName]: eventsReducer,
  [eventNotificationsModuleName]: eventNotificationsReducer,
  [eventNotificationReactionsModuleName]: eventNotificationReactionsReducer,
  [attendeesModuleName]: attendeesReducer
});