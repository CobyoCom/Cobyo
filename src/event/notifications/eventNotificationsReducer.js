import {types} from './eventNotificationsActions';

export const moduleName = 'eventNotifications';

const initialState = {};

const eventNotificationInitialState = {
  eventId: null,
  message: null,
  timestamp: null
};

export default function eventNotifications(state = initialState, {type, payload}) {
  switch(type) {
    case types.fetchEventNotificationsSuccess: {
      const {notifications} = payload;
      return notifications.reduce((byId, notification) => {
        byId[notification.id] = {
          ...eventNotificationInitialState,
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
