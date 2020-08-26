import { ADD_NOTIFICATION, SET_NOTIFICATIONS } from "../actions/notifications";

const initialState = {
  notifications: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      let gId = action.notificationData.groupId;
      let newNotifications = {
        ...state.notifications,
        [gId]: [
          ...state.notifications[gId],
          {
            type: action.notificationData.type,
            notification: action.notificationData.notification,
          },
        ],
      };
      return {
        notifications: newNotifications,
      };
    case SET_NOTIFICATIONS:
      let gId2 = action.groupId;
      let setNotifications = {
        ...state.notifications,
        [gId2]: action.notifications,
      };
      return {
        notifications: setNotifications,
      };
    default:
      return state;
  }
};
