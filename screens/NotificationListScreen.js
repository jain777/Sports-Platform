import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import NotificationListItem from "../components/UI/NotificationListItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/UI/HeaderButton";
import * as notificationActions from "../store/actions/notifications";
import Colors from "../constants/Color";

const NotificationListScreen = (props) => {
  const groupNotifications = useSelector(
    (state) =>
      state.notifications.notifications[props.navigation.getParam("groupId")]
  );
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const { navigation } = props;
  const loadNotifications = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(
        notificationActions.setNotifications(
          props.navigation.getParam("groupId")
        )
      );
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setError, navigation]);
  useEffect(() => {
    setIsLoading(true);
    loadNotifications().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadNotifications]);
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadNotifications
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadNotifications]);
  if (error) {
    return (
      <View style={styles.centred}>
        <Text style={{ color: "red", fontSize: 20 }}>An Error Occured!</Text>
        <Button title={"TRY AGAIN"} onPress={loadNotifications} />
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
  if (!isLoading && !groupNotifications) {
    return (
      <View style={styles.centred}>
        <Text>No Notifications Found. Ask the Admin to Add Some!</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadNotifications}
      refreshing={isRefreshing}
      style={{ flex: 1 }}
      data={groupNotifications}
      keyExtractor={(item) => item.key}
      renderItem={(itemData) => (
        <NotificationListItem
          title={itemData.item.type}
          onPress={() => {}}
          pollQn={itemData.item.notification.question}
          isAdmin={props.navigation.getParam("isAdmin")}
        />
      )}
    />
  );
};

NotificationListScreen.navigationOptions = (navData) => {
  const isAdmin = navData.navigation.getParam("isAdmin");
  return {
    headerTitle: "Notifications",
    headerRight: () => {
      let dispHeader = null;
      if (isAdmin) {
        dispHeader = (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Add"
              iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
              onPress={() => {
                navData.navigation.navigate("NewNotification", {
                  groupId: navData.navigation.getParam("groupId"),
                });
              }}
            />
          </HeaderButtons>
        );
      }
      return dispHeader;
    },
  };
};

const styles = StyleSheet.create({
  centred: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationListScreen;
