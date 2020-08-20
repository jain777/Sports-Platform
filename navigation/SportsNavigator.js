import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/Color";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatRoomList from "../screens/ChatRoomList";
import NewChatScreen from "../screens/NewChatScreen";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const SportsNavigator = createStackNavigator(
  {
    ChatRoomList: ChatRoomList,
    ChatScreen: ChatScreen,
    NewChat: NewChatScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Chat: SportsNavigator,
});

export default createAppContainer(MainNavigator);
