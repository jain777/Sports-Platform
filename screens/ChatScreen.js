import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>This is Chat Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
