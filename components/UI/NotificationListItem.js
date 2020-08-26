import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import Colors from "../../constants/Color";
import { Slider } from "react-native-elements";
import { useDispatch } from "react-redux";
import * as notificationActions from "../../store/actions/notifications";

const NotificationListItem = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const onPressHandler = () => {
    setIsHide((prevState) => !prevState);
  };
  let color1 = "blue";
  let color2 = "blue";
  if (props.hasResponded && props.response === "option1") {
    color1 = "green";
    color2 = "grey";
  } else if (props.hasResponded && props.response === "option2") {
    color1 = "grey";
    color2 = "green";
  }
  const responseText =
    props.response === "option1"
      ? props.notification.option1
      : props.notification.option2;
  const [sliderValue, setSliderValue] = useState(
    parseInt(props.notification ? props.notification.minimumValue : 0)
  );
  const slidingCompletedHandler = async () => {
    setIsLoading(true);
    await dispatch(
      notificationActions.sendResponseSlider(
        props.groupId,
        props.itemKey,
        sliderValue,
        props.detailKey
      )
    );
    setIsLoading(false);
    props.onResponded();
  };
  const doNothingHandler = () => {
    return;
  };
  const submitOption1Handler = async () => {
    setIsLoading(true);
    await dispatch(
      notificationActions.sendResponsePoll(
        props.groupId,
        props.itemKey,
        "option1",
        props.detailKey
      )
    );
    setIsLoading(false);
    props.onResponded();
  };
  const submitOption2Handler = async () => {
    setIsLoading(true);
    await dispatch(
      notificationActions.sendResponsePoll(
        props.groupId,
        props.itemKey,
        "option2",
        props.detailKey
      )
    );
    setIsLoading(false);
    props.onResponded();
  };
  const deleteNotiificationHandler = async () => {
    const deleteNotif = async () => {
      await dispatch(
        notificationActions.deleteNotification(props.groupId, props.itemKey)
      );
      props.onResponded();
    };
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this Notification?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: deleteNotif,
        },
      ]
    );
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
      {props.hasResponded ? (
        <Text
          style={{ color: Colors.primary, fontSize: 16, marginVertical: 5 }}
        >
          Your Response:{" "}
          <Text style={styles.numberBox}>
            {props.hasResponded ? props.response : sliderValue}
          </Text>
        </Text>
      ) : (
        <Text style={{ color: Colors.primary, marginVertical: 5 }}>
          {sliderValue === props.notification
            ? props.notification.minimumValue
            : 0
            ? "You Have Not Responded Yet."
            : "Your Response: " + sliderValue}
        </Text>
      )}
      {props.hasResponded ? (
        <View>
          <Text style={{ marginVertical: 5 }}>
            Average Response:{" "}
            <Text style={styles.numberBox}>{props.avgResponse}</Text>
          </Text>
          <Text style={{ marginVertical: 5 }}>
            Number Of Responses:{" "}
            <Text style={styles.numberBox}>{props.numberOfResponses}</Text>
          </Text>
        </View>
      ) : null}
    </View>
  );
  let optionsPoll = isLoading ? (
    <ActivityIndicator size="large" color="blue" />
  ) : (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View style={styles.buttonCont}>
        <View style={styles.buttonItem}>
          <Button
            title={props.notification.option1}
            color={color1}
            onPress={
              props.hasResponded ? doNothingHandler : submitOption1Handler
            }
          />
        </View>
        <View style={styles.buttonItem}>
          <Button
            title={props.notification.option2}
            color={color2}
            onPress={
              props.hasResponded ? doNothingHandler : submitOption2Handler
            }
          />
        </View>
      </View>
      {props.hasResponded ? (
        <Text style={{ color: Colors.primary, marginVertical: 5 }}>
          Your Response:{" "}
          <Text style={styles.numberBox2}>
            {props.hasResponded ? responseText : "None"}
          </Text>
        </Text>
      ) : (
        <Text style={{ color: Colors.primary, marginVertical: 5 }}>
          {sliderValue === props.notification
            ? props.notification.minimumValue
            : 0
            ? "You Have Not Responded Yet."
            : "Your Response: None"}
        </Text>
      )}
      {props.hasResponded ? (
        <View style={{ textAlign: "center" }}>
          <Text
            style={{ marginVertical: 5, textAlign: "center", fontSize: 17 }}
          >
            {props.notification.option1}:{" "}
            <Text style={styles.numberBox2}>{props.option1}%</Text>
          </Text>
          <Text
            style={{ marginVertical: 5, textAlign: "center", fontSize: 17 }}
          >
            {props.notification.option2}:{" "}
            <Text style={styles.numberBox2}>{props.option2}%</Text>
          </Text>
          <Text style={{ marginVertical: 5 }}>
            Number Of Responses:{" "}
            <Text style={styles.numberBox2}>{props.numberOfResponses}</Text>
          </Text>
        </View>
      ) : null}
    </View>
  );

  let fullDisplayItem = null;
  if (!isHide) {
    fullDisplayItem = (
      <TouchableNativeFeedback onPress={onPressHandler} style={{ flex: 1 }}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={styles.pollQnContainer}>
            <Text style={styles.pollQn}>{props.notification.question}</Text>
            <View style={styles.options}>
              {props.title === "SLIDER POLL" ? optionsSlider : optionsPoll}
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
  } else {
    fullDisplayItem = (
      <TouchableNativeFeedback onPress={onPressHandler} style={{ flex: 1 }}>
        <View style={styles.card}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
          <View style={styles.pollQnContainer}>
            <Text style={styles.pollQn}>{props.notification.question}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  }

  return fullDisplayItem;
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
    textAlign: "center",
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
    margin: 10,
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
    bottom: 15,
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
    textAlign: "center",
  },
  numberBox: {
    color: '#800b0b',
    fontSize: 16,
  },
  numberBox2: {
    color: '#800b0b',
  },
  buttonCont: {
    width: "100%",
    marginHorizontal: 10,
    textAlign: "center",
    flexDirection: "column",
  },
  buttonItem: {
    marginVertical: 15,
    textAlign: "center",
  },
});

export default NotificationListItem;
