import {createSelector} from 'reselect';
import {selectUserName} from '../activeEventSelectors';
import {moduleName} from './reactionsReducer';

export const selectReactionsById = state => state.entities[moduleName];

export function makeSelectReactionsById(state, notificationId) {
  return createSelector(
    selectReactionsById,
    (byId) => byId[notificationId] ? Object.keys(byId[notificationId]) : []
  )(state);
}

export function makeSelectDidUserReact(state, notificationId, emoji) {
  return createSelector(
    selectReactionsById,
    selectUserName,
    (byId, userName) => {
      const notification = byId[notificationId] || {};
      const users = notification[emoji] || {};
      return !!users[userName];
    }
  )(state);
}

export function makeSelectReactionCount(state, notificationId, emoji) {
  return createSelector(
    selectReactionsById,
    (byId) => {
      const notification = byId[notificationId] || {};
      const users = notification[emoji] || {};
      return Object.keys(users).length;
    }
  )(state);
}