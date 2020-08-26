import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useSelector, useDispatch } from "react-redux";
import * as chatActions from "../store/actions/chat";
import * as chatlistActions from "../store/actions/chatlist";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";

const ChatScreen = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const paramsGroupId = props.navigation.getParam("groupId");
  const dispatch = useDispatch();
  const loadGroups = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(chatlistActions.setChatGroups());
    } catch (err) {
      console.log(err);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing]);
  const chats = useSelector(
    (state) =>
      state.chatList.chatGroupList.filter(
        (chatGroup) => chatGroup.id === props.navigation.getParam("groupId")
      )[0]["chats"]
  );
  const admin = useSelector(
    (state) =>
      state.chatList.chatGroupList.filter(
        (chatGroup) => chatGroup.id === props.navigation.getParam("groupId")
      )[0]["admin"]
  );

  let transformedChats = [];

  chats.map((chat) => transformedChats.push(chat[0]));
  transformedChats = transformedChats.reverse();

  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(transformedChats);
  }, [chats]);
  useEffect(() => {
    props.navigation.setParams({
      isAdmin: userId === admin,
    });
  }, []);
  const exitGroup = useCallback(async () => {
    try {
      Alert.alert("Are you sure?", "Do you really want to exit this Group?", [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(chatlistActions.exitChatGroup(paramsGroupId));
            props.navigation.goBack();
          },
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, paramsGroupId]);
  useEffect(() => {
    props.navigation.setParams({
      refresh: loadGroups,
      exit: exitGroup,
    });
  }, []);
  const onSend = useCallback((messages = []) => {
    dispatch(
      chatActions.sendChat(messages, props.navigation.getParam("groupId"))
    );
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <View style={styles.screen}>
      <View style={styles.idContainer}>
        <Text style={styles.idText}>
          GROUP ID:{"   "}
          <Text style={styles.id}>{props.navigation.getParam("groupId")}</Text>
        </Text>
      </View>
      {isRefreshing ? (
        <View style={styles.refreshing}>
          <ActivityIndicator size={"large"} color={"black"} />
        </View>
      ) : null}
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userId,
          name: username,
        }}
      />
    </View>
  );
};

ChatScreen.navigationOptions = (navData) => {
  const refreshFn = navData.navigation.getParam("refresh");
  const exitFn = navData.navigation.getParam("exit");
  return {
    headerTitle: navData.navigation.getParam("groupName"),
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-refresh" : "ios-refresh"}
            onPress={() => {
              refreshFn();
            }}
          />
          <Item
            title="Notification"
            iconName={Platform.OS === "android" ? "md-alert" : "ios-alert"}
            onPress={() => {
              navData.navigation.navigate("NotificationList", {
                isAdmin: navData.navigation.getParam("isAdmin"),
                groupId: navData.navigation.getParam("groupId"),
              });
            }}
          />
          <Item
            title="Exit"
            iconName={Platform.OS === "android" ? "md-exit" : "ios-exit"}
            onPress={() => {
              exitFn();
            }}
          />
        </HeaderButtons>
      );
    },
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
  refreshing: {
    position: "absolute",
    top: 55,
    zIndex: 100,
    width: "100%",
    alignItems: "center",
  },
});

export default ChatScreen;
