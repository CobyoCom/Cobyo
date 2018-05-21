import {createSelector} from 'reselect';
import {moduleName} from './reactionsReducer';

export const selectReactionsById = state => state.entities[moduleName];

export function makeSelectReactionsById(state, notificationId) {
  return createSelector(
    selectReactionsById,
    (byId) => byId[notificationId] ? Object.keys(byId[notificationId]) : []
  )(state);
}