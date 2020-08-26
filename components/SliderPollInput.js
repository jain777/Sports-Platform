import React, { useState, useEffect, useCallback } from "react";
import Input from "./UI/Input";
import { View, StyleSheet } from "react-native";

const SliderPollInput = (props) => {
  const [question, setQuestion] = useState("");
  const [minimumValue, setMinimumValue] = useState(0);
  const [maximumValue, setMaximumValue] = useState(1);
  const [questionValidity, setQuestionValidity] = useState(false);
  const { onInputChange } = props;
  useEffect(() => {
    onInputChange(question, questionValidity, maximumValue, minimumValue);
  }, [question, maximumValue, minimumValue, questionValidity]);
  const questionChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setQuestion(inputValue);
      setQuestionValidity(inputValidity);
    },
    [setQuestionValidity, setQuestion]
  );
  const maxValChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setMaximumValue(inputValue);
    },
    [setMaximumValue]
  );
  const minValChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setMinimumValue(inputValue);
    },
    [setMinimumValue]
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
        id="minVal"
        label="Minimum Value"
        errorText="Please enter a valid Value!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={minValChangedHandler}
        initialValue={"-9.9"}
        initiallyValid={true}
      />
      <Input
        id="maxVal"
        label="Maximum Value"
        errorText="Please enter a valid Value!"
        keyboardType="decimal-pad"
        returnKeyType="next"
        onInputChange={maxValChangedHandler}
        initialValue={"9.9"}
        initiallyValid={true}
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

export default SliderPollInput;
