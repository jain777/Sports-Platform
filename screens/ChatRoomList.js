import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const ChatRoomListScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is Chat Room List Screen</Text>
    </View>
  );
};

ChatRoomListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Chat Groups",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("NewChat");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatRoomListScreen;
