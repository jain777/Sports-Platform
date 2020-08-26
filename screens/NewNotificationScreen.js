import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Switch,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Button,
  ScrollView,
  Text,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Color";
import * as notificationsActions from "../store/actions/notifications";
import PollInput from "../components/PollInput";
import SliderPollInput from "../components/SliderPollInput";

const FilterSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text style={styles.label}>{props.label}</Text>
      <Switch
        trackColor={{ true: Colors.primary }}
        thumbColor={Colors.accent}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const newNotificationScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [minimumValue, setMinimumValue] = useState(0);
  const [maximumValue, setMaximumValue] = useState(1);
  const [questionValidity, setQuestionValidity] = useState(false);
  const inputChangedHandler = useCallback(
    (question, questionValidity, option1, option2) => {
      setQuestion(question);
      setQuestionValidity(questionValidity);
      setOption1(option1);
      setOption2(option2);
    },
    [setOption2, setOption1, setQuestionValidity, setQuestion]
  );
  const sliderInputChangedHandler = useCallback(
    (question, questionValidity, maxVal, minVal) => {
      setQuestion(question);
      setQuestionValidity(questionValidity);
      setMaximumValue(maxVal);
      setMinimumValue(minVal);
    },
    [setMaximumValue, setMinimumValue, setQuestionValidity, setQuestion]
  );
  const { navigation } = props;
  const submitHandler = useCallback(async () => {
    if (
      !questionValidity ||
      question === "" ||
      maximumValue === "9.9" ||
      minimumValue === "-9.9"
    ) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    const groupId = navigation.getParam("groupId");
    const type = isPoll ? "POLL" : "SLIDER POLL";
    const notification = isPoll
      ? { question: question, option1: option1, option2: option2 }
      : {
          question: question,
          maximumValue: maximumValue,
          minimumValue: minimumValue,
        };
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(
        notificationsActions.createNotification(groupId, type, notification)
      );
      props.navigation.navigate("NotificationList");
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [
    setError,
    setIsLoading,
    question,
    maximumValue,
    minimumValue,
    option2,
    option1,
    questionValidity,
    navigation,
    dispatch,
  ]);
  const [isPoll, setIsPoll] = useState(false);
  const [isSliderPoll, setIsSliderPoll] = useState(false);
  const pollChangedHandler = (newVal) => {
    if (newVal) {
      setIsPoll(newVal);
      setIsSliderPoll(false);
    } else {
      setIsPoll(newVal);
    }
  };
  const sliderPollChangedHandler = (newVal) => {
    if (newVal) {
      setIsSliderPoll(newVal);
      setIsPoll(false);
    } else {
      setIsSliderPoll(newVal);
    }
  };
  let displayedItem = null;
  if (isPoll) {
    displayedItem = <PollInput onInputChange={inputChangedHandler} />;
  } else if (isSliderPoll) {
    displayedItem = (
      <SliderPollInput onInputChange={sliderInputChangedHandler} />
    );
  }
  if (isLoading) {
    return (
      <View style={styles.centred}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.notifType}>Type of Notification?</Text>
          <View style={styles.switchCont}>
            <FilterSwitch
              label={"Poll"}
              state={isPoll}
              onChange={pollChangedHandler}
            />
            <FilterSwitch
              label={"Silder Poll"}
              state={isSliderPoll}
              onChange={sliderPollChangedHandler}
            />
          </View>
          <Text style={styles.notifType}>Notification Details: </Text>
          <View style={styles.displayCont}>{displayedItem}</View>
          <View style={styles.adminBtn}>
            <Button
              title={`SUBMIT`}
              color={"green"}
              onPress={submitHandler}
              disabled={!isPoll && !isSliderPoll}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

newNotificationScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Create a New Notification",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  notifType: {
    width: "70%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#164b6b",
    color: "white",
    fontSize: 19,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  switchCont: {
    flexDirection: "column",
  },
  label: {
    marginHorizontal: 10,
    fontSize: 20,
  },
  displayCont: {
    flexDirection: "row",
    marginTop: 10,
    padding: 15,
  },
  adminBtn: {
    height: 40,
  },
  centred: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default newNotificationScreen;
