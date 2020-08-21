export const SEND_CHAT = "SEND_CHAT";

export const sendChat = (chat,groupId) => {
  return async (dispatch, getState) => {
    // console.log(chat);
    const token = getState().auth.token;
    const response = await fetch(
      `https://sports-app-28cb3.firebaseio.com/chatGroups.json?auth=${token}`
    );
    if (!response.ok) {
      throw new Error("Some Error Occured!");
    }

    const respData = await response.json();
    let chats = null;
    for (let key in respData) {
      if (key === groupId) {
        chats = respData[key].chats;
      }
    }
    let newChat = null;
    if(!chats){
      newChat = [chat];
    }
    else{
      newChat = [...chats,chat];
    }
    const newResponse = await fetch(
      `https://sports-app-28cb3.firebaseio.com/chatGroups/${groupId}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chats: newChat,
          groupId:groupId,
        }),
      }
    );

    if (!newResponse.ok) {
      throw new Error("Some Error Occured!");
    }

    const newRespData = await newResponse.json();
    // console.log(newRespData);
  };
};
