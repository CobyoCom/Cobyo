import {moduleName} from './notificationsReducer';

export const selectNotificationsById = state => state.entities[moduleName];