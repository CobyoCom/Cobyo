import { types } from './notificationsActions';

export const moduleName = 'notificationReactions';

const initialState = {};

export default function notificationReactions(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case types.fetchNotificationsSuccess: {
      const { notifications } = payload;
      const newState = {};

      notifications.forEach(notification => {
        const notificationId = notification.createdAt;
        const notificationReactions = { ...newState[notificationId] };

        notification.reactions.forEach(({ emoji, userName }) => {
          notificationReactions[emoji] = {
            ...notificationReactions[emoji],
            [userName]: true
          };
        });

        newState[notificationId] = notificationReactions;
      });

      return newState;
    }
    case types.reactToNotificationRequest:
    case types.reactToNotificationFailure: {
      const { notificationId, emoji, userName } = payload;
      const notificationReactions = state[notificationId] || {};
      const emojiUsers = notificationReactions[emoji]
        ? notificationReactions[emoji]
        : {};
      const hasSameReaction = !!emojiUsers[userName];

      if (hasSameReaction) {
        // eslint-disable-next-line no-empty-pattern
        const {
          [emoji]: {},
          ...restNotificationReactions
        } = notificationReactions;
        // eslint-disable-next-line no-empty-pattern
        const { [userName]: {}, ...restUsers } = emojiUsers;
        return {
          ...state,
          [notificationId]: {
            ...restNotificationReactions,
            ...(Object.keys(restUsers).length !== 0 && { [emoji]: restUsers })
          }
        };
      }

      return {
        ...state,
        [notificationId]: {
          ...notificationReactions,
          [emoji]: {
            ...emojiUsers,
            [userName]: true
          }
        }
      };
    }
    default:
      return state;
  }
}
