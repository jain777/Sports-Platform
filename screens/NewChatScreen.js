import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../constants/Color";
import Input from "../components/UI/Input";
import * as chatlistActions from "../store/actions/chatlist";

const NewChatScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [nameValidity, setNameValidity] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Ok" }]);
    }
  }, [error]);
  const submitHandler = useCallback(async () => {
    if (!nameValidity) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(chatlistActions.createChatGroup(name));

      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, name]);
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      setName(inputValue);
      setNameValidity(inputValidity);
    },
    [setNameValidity, setName]
  );
  if (isLoading) {
    return (
      <View style={styles.centred}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={""}
          initiallyValid={false}
        />
        <Input
          id="sport"
          label="Sport"
          errorText="Please enter a valid Sport!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          onInputChange={() => {}}
          initialValue={""}
          initiallyValid={false}
        />
        <Button
          color={Colors.accent}
          onPress={submitHandler}
          title={"Create Group"}
          style={{ margin: 30 }}
        />
      </View>
    </View>
  );
};

NewChatScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Create a New Group",
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 50,
    width: "70%",
  },
  centred: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NewChatScreen;
