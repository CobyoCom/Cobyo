import { types } from './notificationsActions';

export const moduleName = 'notifications';

const initialState = {};

export default function notifications(state = initialState, { type, payload }) {
  switch (type) {
    case types.fetchNotificationsSuccess: {
      const { notifications } = payload;
      return notifications.reduce(
        (byId, { reactions, ...notification }) => {
          byId[notification.createdAt] = {
            ...byId[notification.createdAt],
            ...notification
          };

          return byId;
        },
        { ...state }
      );
    }
    default:
      return state;
  }
}
