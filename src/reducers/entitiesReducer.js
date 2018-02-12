import {combineReducers} from 'redux';
import eventsReducer, {moduleName as eventsModuleName} from './entities/eventsReducer';
import eventNotificationsReducer, {moduleName as eventNotificationsModuleName} from '../event/EventNotifications/eventNotificationsReducer';

export default combineReducers({
  [eventsModuleName]: eventsReducer,
  [eventNotificationsModuleName]: eventNotificationsReducer
});