import React, { useState, useEffect, useCallback } from "react";
import Input from "./UI/Input";
import { View, StyleSheet } from "react-native";

const PollInput = (props) => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [questionValidity, setQuestionValidity] = useState(false);
  const { onInputChange } = props;
  useEffect(() => {
    onInputChange(question, questionValidity, option1, option2);
  }, [question, option1, option2, questionValidity]);
  const questionChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setQuestion(inputValue);
      setQuestionValidity(inputValidity);
    },
    [setQuestionValidity, setQuestion]
  );
  const option1ChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setOption1(inputValue);
    },
    [setOption1]
  );
  const option2ChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setOption2(inputValue);
    },
    [setOption2]
  );
  return (
    <View style={styles.pollCont}>
      <Input
        id="question"
        label="Question"
        errorText="Please enter a valid Question!"
        keyboardType="default"
        returnKeyType="next"
        onInputChange={questionChangedHandler}
        initialValue={""}
        initiallyValid={true}
        minLength={5}
      />
      <Input
        id="option1"
        label="Option 1"
        errorText="Please enter a valid Option!"
        keyboardType="default"
        returnKeyType="next"
        onInputChange={option1ChangedHandler}
        initialValue={""}
        initiallyValid={true}
        minLength={7}
      />
      <Input
        id="option2"
        label="Option 2"
        errorText="Please enter a valid Option!"
        keyboardType="default"
        returnKeyType="next"
        onInputChange={option2ChangedHandler}
        initialValue={""}
        initiallyValid={true}
        minLength={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pollCont: {
    flexDirection: "column",
    flex: 1,
    margin: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PollInput;
