export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const SEND_RESPONSE = "SEND_RESPONSE";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";

export const deleteNotification = (groupId, key) => {
  return async (dispatch, getState) => {
    //any async code you went!
    const token = getState().auth.token;
    // const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}/${key}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!!!");
    }
  };
};

export const createNotification = (groupId, type, notification) => {
  return async (dispatch, getState) => {
    //any async code you went!
    const token = getState().auth.token;
    // const userId = getState().auth.userId;
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
          details: {
            numberOfResponses: 0,
            averageValue: 0,
          },
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
        details: {
          numberOfResponses: 0,
          averageValue: 0,
        },
      },
    });
  };
};
export const sendResponse = (groupId, key, resp, detailKey) => {
  return async (dispatch, getState) => {
    //any async code you went!
    // console.log(key);
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}/${key}/responses/${userId}.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response: resp,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Something Went Wrong!!!");
    }
    const response2 = await fetch(
      `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}/${key}/details.json?auth=${token}`
    );
    if (!response2.ok) {
      throw new Error("Something Went Wrong!!!");
    }
    const respData2 = await response2.json();
    // console.log(respData2);
    const newAvgVal =
      (respData2.numberOfResponses * respData2.averageValue + resp) /
      (respData2.numberOfResponses + 1).toFixed(2);
    const response3 = await fetch(
      `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}/${key}/details.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          numberOfResponses: respData2.numberOfResponses + 1,
          averageValue: newAvgVal,
        }),
      }
    );
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

    let numberOfResponses = 0;
    let averageValue = 0;
    let detailKey = "";
    let obtainedNotifications = [];
    for (let key in respData) {
      const response2 = await fetch(
        `https://sports-app-28cb3.firebaseio.com/notifications/${groupId}/${key}/responses/${userId}.json?auth=${token}`
      );
      const respData2 = await response2.json();
      // console.log(respData2);
      const details = respData[key].details;
      // console.log(details);
      numberOfResponses = details.numberOfResponses;
      averageValue = details.averageValue;

      if (!respData2) {
        obtainedNotifications.push({
          key: key,
          type: respData[key].type,
          notification: respData[key].notification,
          hasResponded: false,
          response: 0,
          averageValue: averageValue,
          numberOfResponses: numberOfResponses,
          detailKey: detailKey,
        });
      } else {
        for (let key2 in respData2) {
          obtainedNotifications.push({
            key: key,
            type: respData[key].type,
            notification: respData[key].notification,
            hasResponded: true,
            response: respData2[key2].response,
            averageValue: averageValue,
            numberOfResponses: numberOfResponses,
            detailKey: detailKey,
          });
        }
      }
    }
    // console.log(obtainedNotifications);
    
    dispatch({
      type: SET_NOTIFICATIONS,
      groupId: groupId,
      notifications: obtainedNotifications,
    });
  };
};
