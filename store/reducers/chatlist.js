import {
  ADD_CHAT_GROUP,
  SET_CHAT_GROUPS,
  JOIN_CHAT_GROUP,
  DELETE_CHAT_GROUP,
} from "../actions/chatlist";

const initialState = {
  chatGroupList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHAT_GROUPS:
      return {
        chatGroupList: action.chatGroupList,
      };
    case ADD_CHAT_GROUP:
      return {
        chatGroupList: state.chatGroupList.concat(action.chatGroupData),
      };
    case JOIN_CHAT_GROUP:
      return {
        chatGroupList: state.chatGroupList.concat(action.chatGroupData),
      };
    case DELETE_CHAT_GROUP:
      let newChatGroups = [...state.chatGroupList];
      newChatGroups = newChatGroups.filter(
        (group) => group.id !== action.groupId
      );
      return {
        chatGroupList: newChatGroups,
      };
    default:
      return state;
  }
};
