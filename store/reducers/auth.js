import { AUTHENTICATE, LOGOUT, SET_USERNAME } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  username: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    case SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    default:
      return state;
  }
};
