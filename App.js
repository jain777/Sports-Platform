import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import NavContainer from "./navigation/NavigationContainer";
import authReducer from "./store/reducers/auth";
import chatListReducer from "./store/reducers/chatlist";
import notificationsReducer from "./store/reducers/notifications";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  chatList: chatListReducer,
  notifications: notificationsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
}
