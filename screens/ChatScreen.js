import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const ChatScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.idContainer}>
        <Text style={styles.idText}>
          GROUP ID:{"   "}
          <Text style={styles.id}>{props.navigation.getParam("groupId")}</Text>
        </Text>
      </View>
      <GiftedChat />
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
  },
  idContainer: {
    top: 0,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#35733e",
  },
  idText: {
    color: "#f2f26f",
    fontSize: 18,
  },
  id: {
    color: "#cdd4d3",
    fontSize: 20,
  },
});

export default ChatScreen;
