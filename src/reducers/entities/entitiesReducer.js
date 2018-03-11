import {combineReducers} from 'redux';
import eventsReducer, {moduleName as eventsModuleName} from './eventsReducer';
import eventNotificationsReducer, {moduleName as eventNotificationsModuleName} from '../../event/notifications/eventNotificationsReducer';
import attendeesReducer, {moduleName as attendeesModuleName} from '../../event/attendees/attendeesReducer';

export default combineReducers({
  [eventsModuleName]: eventsReducer,
  [eventNotificationsModuleName]: eventNotificationsReducer,
  [attendeesModuleName]: attendeesReducer
});