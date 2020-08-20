export const ADD_CHAT_GROUP = "ADD_CHAT_GROUP";
export const SET_CHAT_GROUPS = "SET_CHAT_GROUPS";

export const setChatGroups = () => {
  return async (dispatch, getState) => {
    //any async code you went!
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    try {
      const response = await fetch(
        `https://sports-app-28cb3.firebaseio.com/chatGroups.json?auth=${token}`
      );

      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }
      const respData = await response.json();
      // console.log(respData);
      const loadedGroups = [];

      // for (key in respData) {
      //   let newProd = new Product(
      //     key,
      //     respData[key].ownerId,
      //     respData[key].title,
      //     respData[key].imageUrl,
      //     respData[key].description,
      //     respData[key].price
      //   );
      //   loadedProducts.push(newProd);
      // }

      dispatch({
        type: SET_CHAT_GROUPS,
        chatGroupList: loadedGroups,
      });
    } catch (err) {
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

    dispatch({
      type: ADD_CHAT_GROUP,
      chatGroupData: {},
    });
  };
};
