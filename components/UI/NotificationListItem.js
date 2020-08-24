import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Button,
} from "react-native";
import Colors from "../../constants/Color";

const NotificationListItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress} style={{ flex: 1 }}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.pollQnContainer}>
          <Text style={styles.pollQn}>{props.pollQn}</Text>
          {props.isAdmin ? (
            <View style={styles.adminCont}>
              <View style={styles.adminBtn}>
                <Button
                  title={`DELETE ${props.title}`}
                  color={"red"}
                  onPress={props.deleteGroup}
                />
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    elevation: 5,
    backgroundColor: "white",
    width: "80%",
    alignItems: "center",
    flexDirection: "column",
    marginHorizontal: 30,
    marginVertical: 35,
    padding: 20,
    borderRadius: 12,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 25,
    color: Colors.primary,
  },
  pollQnContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pollQn: {
    fontSize: 22,
    color: "white",
    margin: 20,
    padding: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "black",
  },
  adminCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    backgroundColor: "white",
  },
  adminBtn: {
    height: 30,
  },
});

export default NotificationListItem;
