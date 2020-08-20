import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Color";

const ChatGroupItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={{flex:1}}>
        <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.peopleContainer}>
        <Text style={styles.people}>
          <Text style={styles.number}>{props.people}</Text>{" "}
          {props.people > 1 ? "Members" : "Member"}
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    elevation: 5,
    backgroundColor: "white",
    width: "80%",
    height: 200,
    alignItems: "center",
    flexDirection: "column",
    margin: 40,
  },
  titleContainer: {
    height: 120,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#abcaae",
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
    backgroundColor: "#eee"
  },
  people: {
    fontSize: 15,
  },
  number: {
    fontSize: 15,
    color: Colors.primary,
  },
});

export default ChatGroupItem;
