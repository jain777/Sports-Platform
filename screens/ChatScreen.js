import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is Chat Screen</Text>
    </View>
  );
};

ChatScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("groupName"),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
