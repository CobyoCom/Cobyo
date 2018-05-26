import {types} from './notificationsActions';

export const moduleName = 'notifications';

const initialState = {};

const notificationInitialState = {
  reactions: {}
};

export default function notifications(state = initialState, {type, payload}) {
  switch(type) {
    case types.fetchNotificationsSuccess: {
      const {notifications} = payload;
      return notifications.reduce((byId, notification) => {
        byId[notification.id] = {
          ...notificationInitialState,
          ...byId[notification.id],
          ...notification
        };

        return byId;
      }, {...state});
    }
    default:
      return state;
  }
}
