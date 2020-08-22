import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import * as chatlistActions from "../store/actions/chatlist";
import Colors from "../constants/Color";
import ChatGroupItem from "../components/UI/chatGroupItem";

const ChatRoomListScreen = (props) => {
  const userChatGroups = useSelector((state) => state.chatList.chatGroupList);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const delteGroupHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this Group?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(chatlistActions.deleteChatGroup(id));
        },
      },
    ]);
  };
  const loadGroups = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(chatlistActions.setChatGroups());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError]);
  useEffect(() => {
    setIsLoading(true);
    loadGroups().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadGroups]);
  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadGroups);

    return () => {
      willFocusSub.remove();
    };
  }, [loadGroups]);
  if (error) {
    return (
      <View style={styles.centred}>
        <Text style={{ color: "red", fontSize: 20 }}>An Error Occured!</Text>
        <Button title={"TRY AGAIN"} onPress={loadGroups} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centred}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && userChatGroups.length === 0) {
    return (
      <View style={styles.centred}>
        <Text>No Groups Found. Maybe Start Joining or Creating Some!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.idContainer}>
        <Text style={styles.idText}>
          WELCOME{"   "}
          {/* -MFEslyJyG_TeSPj-Jqe */}
          <Text style={styles.id}>{username}</Text>
        </Text>
      </View>
      <FlatList
        onRefresh={loadGroups}
        refreshing={isRefreshing}
        style={{ flex: 1 }}
        data={userChatGroups}
        keyExtractor={(item) => item.groupName}
        renderItem={(itemData) => (
          <ChatGroupItem
            title={itemData.item.groupName}
            deleteGroup={() => delteGroupHandler(itemData.item.id)}
            people={itemData.item.users.length}
            isAdmin={itemData.item.isAdmin}
            onPress={() => {
              props.navigation.navigate("ChatScreen", {
                groupName: itemData.item.groupName,
                groupId: itemData.item.id,
              });
            }}
          />
        )}
      />
    </View>
  );
};

ChatRoomListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Your Chat Groups",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("NewChat");
            }}
          />
        </HeaderButtons>
      );
    },
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
            onPress={() => {
              navData.navigation.toggleDrawer();
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
    width: "100%",
  },
  centred: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default ChatRoomListScreen;
