import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Button,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/Color";
import { Slider } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as notificationActions from "../../store/actions/notifications";

const NotificationListItem = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [sliderValue, setSliderValue] = useState(
    parseInt(props.notification ? props.notification.minimumValue : 0)
  );
  const slidingCompletedHandler = async () => {
    setIsLoading(true);
    await dispatch(
      notificationActions.sendResponse(
        props.groupId,
        props.itemKey,
        sliderValue,
        props.detailKey
      )
    );
    setIsLoading(false);
    props.onResponded();
  };
  const deleteNotiificationHandler = async () => {
    setIsLoading(true);
    await dispatch(
      notificationActions.deleteNotification(props.groupId, props.itemKey)
    );
    setIsLoading(false);
    props.onResponded();
  };

  let optionsSlider = isLoading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <View style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}>
      <Slider
        value={props.hasResponded ? props.response : sliderValue}
        onValueChange={(newVal) => {
          setSliderValue(newVal);
        }}
        onSlidingComplete={slidingCompletedHandler}
        maximumValue={
          props.notification ? parseInt(props.notification.maximumValue) : 100
        }
        minimumValue={
          props.notification ? parseInt(props.notification.minimumValue) : 0
        }
        step={1}
        disabled={props.hasResponded}
        style={{ flex: 1 }}
      />
      <Text style={{ color: Colors.primary }}>
        Your Response: {props.hasResponded ? props.response : sliderValue}
      </Text>
      <Text style={{ color: Colors.accent }}>
        Average Response: {props.avgResponse}
      </Text>
      <Text style={{ color: Colors.primary }}>
        Number Of Responses: {props.numberOfResponses}
      </Text>
    </View>
  );

  return (
    <TouchableNativeFeedback onPress={props.onPress} style={{ flex: 1 }}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.pollQnContainer}>
          <Text style={styles.pollQn}>{props.notification.question}</Text>
          <View style={styles.options}>
            {props.title === "SLIDER POLL" ? optionsSlider : null}
          </View>
          {props.isAdmin ? (
            <View style={styles.adminCont}>
              <View style={styles.adminBtn}>
                <Button
                  title={`DELETE ${props.title}`}
                  color={"red"}
                  onPress={deleteNotiificationHandler}
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
  options: {
    flex: 1,
    padding: 20,
    margin: 20,
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default NotificationListItem;
