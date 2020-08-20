import {ADD_CHAT_GROUP, SET_CHAT_GROUPS} from "../actions/chatlist";

const initialState = {
    chatGroupList : []
  };

  export default (state = initialState, action) => {
    switch (action.type) {
      case SET_CHAT_GROUPS:
          return {
              chatGroupList:action.chatGroups,
          }
      case ADD_CHAT_GROUP:
        return {
          chatGroupList: state.chatGroupList.concat(action.chatGroup),
        };
      default:
        return state;
    }
  };