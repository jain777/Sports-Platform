import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Button,
} from "react-native";
import Colors from "../../constants/Color";

const ChatGroupItem = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onPress} style={{ flex: 1 }}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.peopleContainer}>
          <Text style={styles.people}>
            <Text style={styles.number}>{props.people}</Text>
            {"    "}
            {props.people > 1 ? "Members" : "Member"}
          </Text>
          {props.isAdmin ? (
            <View style={styles.adminCont}>
              <Text style={styles.admin}>Admin</Text>
              <View style={styles.adminBtn}>
                <Button
                  title="DELETE GROUP"
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
    height: 220,
    alignItems: "center",
    flexDirection: "column",
    margin: 30,
  },
  titleContainer: {
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff1f48",
  },
  title: {
    fontSize: 25,
    color: "white",
  },
  peopleContainer: {
    height: 80,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingTop: 20,
  },
  people: {
    fontSize: 15,
  },
  number: {
    fontSize: 23,
    color: Colors.primary,
  },
  adminCont: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    height: 67,
    alignItems: "center",
    backgroundColor: "#eee",
  },
  admin: {
    fontSize: 14,
    color: Colors.accent,
    marginTop: 10,
  },
  adminBtn: {
    height: 30,
  },
});

export default ChatGroupItem;
