import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Colors from "../constants/Color";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatRoomList from "../screens/ChatRoomList";

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
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: LoginScreen,
  Chat: SportsNavigator,
});

export default createAppContainer(MainNavigator);
