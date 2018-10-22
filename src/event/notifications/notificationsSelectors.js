import { createSelector } from 'reselect';
import { moduleName } from './notificationsReducer';
import { selectNotificationIds } from '../activeEventSelectors_old';

export const selectNotificationsById = state => state.entities[moduleName];

export function makeSelectNotificationIndexById(state, notificationId) {
  return createSelector(
    selectNotificationIds,
    (notificationIds) => notificationIds.indexOf(notificationId)
  )(state);
}
