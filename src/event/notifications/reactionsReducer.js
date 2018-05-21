import {types} from './eventNotificationsActions';

export const moduleName = 'eventNotificationReactions';

const initialState = {};

export default function eventNotificationReactions(state = initialState, {type, payload}) {
  switch (type) {
    case types.reactToEventNotificationRequest: {
      const {notificationId, emoji, userName} = payload;
      const notificationReactions = state[notificationId] || {};
      const emojiUsers = notificationReactions[emoji] ? notificationReactions[emoji] : {};
      const hasSameReaction = !!emojiUsers[userName];

      if (hasSameReaction) {
        const {[emoji]: {}, ...restNotificationReactions} = notificationReactions;
        const {[userName]: {}, ...restUsers} = emojiUsers;
        return {
          ...state,
          [notificationId]: {
            ...restNotificationReactions,
            ...(Object.keys(restUsers).length !== 0 && {[emoji]: restUsers})
          }
        };
      }

      return {
        ...state,
        [notificationId]: {
          ...notificationReactions,
          [emoji]: {
            ...emojiUsers,
            [userName]: {
              timestamp: (new Date()).getTime()
            }
          }
        }
      };

    }
    default:
      return state;
  }
}
