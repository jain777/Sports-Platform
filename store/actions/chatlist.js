export const ADD_CHAT_GROUP = "ADD_CHAT_GROUP";
export const SET_CHAT_GROUPS = "SET_CHAT_GROUPS";
export const JOIN_CHAT_GROUP = "JOIN_CHAT_GROUP";

export const setChatGroups = () => {
  return async (dispatch, getState) => {
    //any async code you went!
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://sports-app-28cb3.firebaseio.com/chatGroups.json?auth=${token}`
      );
      // console.log(response);

      if (!response.ok) {
        // console.log(response);

        throw new Error("Something Went Wrong!");
      }
      const respData = await response.json();
      // console.log(respData);
      const userGroups = [];

      for (let key in respData) {
        if (respData[key].users.some((user) => user === userId)) {
          userGroups.push({
            isAdmin: respData[key].admin === userId,
            id: key,
            ...respData[key],
          });
        }
      }

      // console.log(userGroups);

      dispatch({
        type: SET_CHAT_GROUPS,
        chatGroupList: userGroups,
      });
    } catch (err) {
      console.log(err);
      //send to custom analytics server
      throw err;
    }
  };
};

export const createChatGroup = (groupName) => {
  return async (dispatch, getState) => {
    //any async code you went!
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/chatGroups.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin: userId,
          groupName: groupName,
          users: [userId],
        }),
      }
    );

    const respData = await response.json();
    // console.log(respData);

    dispatch({
      type: ADD_CHAT_GROUP,
      chatGroupData: {
        id: respData.name,
        admin: userId,
        groupName,
        isAdmin: true,
        users: [userId],
      },
    });
  };
};
export const joinChatGroup = (groupId) => {
  return async (dispatch, getState) => {
    //any async code you went!

    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/chatGroups.json?auth=${token}`
    );
    if (!response.ok) {
      throw new Error("Some Error Occured!");
    }

    const respData = await response.json();
    // console.log(respData);

    let chatUsers = [];
    let admin = null;
    let groupName = null;
    let key = null;
    for (let key in respData) {
      if (key === groupId) {
        key = key;
        chatUsers = respData[key].users;
        admin = respData[key].admin;
        groupName = respData[key].groupName;
      }
    }
    // console.log(chatUsers);

    const newUsers = chatUsers.concat(userId);
    // console.log(newUsers);
    const newResponse = await fetch(
      `https://sports-app-28cb3.firebaseio.com/chatGroups/${groupId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          users: newUsers,
        }),
      }
    );

    if (!newResponse.ok) {
      throw new Error("Some Error Occured!");
    }

    const newRespData = await newResponse.json();
    console.log(newRespData);

    dispatch({
      type: JOIN_CHAT_GROUP,
      chatGroupData: {
        id: key,
        users: newUsers,
        admin: admin,
        groupName: groupName,
        isAdmin: false,
      },
    });
  };
};
