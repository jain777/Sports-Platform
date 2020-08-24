import notifications from "../reducers/notifications";

export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";

export const createNotification = (groupId, type, notification) => {
  return async (dispatch, getState) => {
    //any async code you went!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: type,
          notification: notification,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!!!");
    }

    dispatch({
      type: ADD_NOTIFICATION,
      notificationData: {
        groupId: groupId,
        type: type,
        notification: notification,
      },
    });
  };
};

export const setNotifications = (groupId) => {
  return async (dispatch, getState) => {
    //any async code you went!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}.json?auth=${token}`
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!!!");
    }

    const respData = await response.json();

    let obtainedNotifications = [];
    for (key in respData) {
      obtainedNotifications.push({
        key: key,
        type: respData[key].type,
        notification: respData[key].notification,
      });
    }

    dispatch({
      type: SET_NOTIFICATIONS,
      groupId: groupId,
      notifications: obtainedNotifications,
    });
  };
};
