import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import Colors from "../constants/Color";
import LoginScreen from "../screens/LoginScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatRoomList from "../screens/ChatRoomList";
import NewChatScreen from "../screens/NewChatScreen";
import UsernameScreen from "../screens/UsernameScreen";
import NotificationListScreen from "../screens/NotificationListScreen";
import NewNotificationScreen from "../screens/NewNotificationScreen";
import React from "react";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { logout } from "../store/actions/auth";
import { useDispatch } from "react-redux";

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
    NotificationList: NotificationListScreen,
    NewNotification: NewNotificationScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);
const DrawerNavigator = createDrawerNavigator(
  {
    Sport: SportsNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20, marginTop: 50 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title={"Logout"}
              color={Colors.accent}
              onPress={() => {
                dispatch(logout());
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Username: UsernameScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Chat: DrawerNavigator,
});

export default createAppContainer(MainNavigator);
