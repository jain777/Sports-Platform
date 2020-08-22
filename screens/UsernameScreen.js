import Input from "../components/UI/Input";
import Colors from "../constants/Color";
import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as authActions from "../store/actions/auth";
import { useDispatch } from "react-redux";

const UsernameScreen = (props) => {
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
    // if (!nameValidity) {
    //   Alert.alert("Wrong input!", "Please check the errors in the form.", [
    //     { text: "Okay" },
    //   ]);
    //   return;
    // }

    //   console.log("Built");

    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.setUsername(name));
      props.navigation.navigate("Chat");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [setError, setIsLoading, name]);
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
        <View>
          <Input
            id="username"
            label="Username"
            errorText="Please enter a valid Username!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={""}
            initiallyValid={false}
          />
        </View>

        <View style={styles.button}>
          <Button
            color={Colors.accent}
            onPress={submitHandler}
            title={"Set Username"}
          />
        </View>
      </View>
    </View>
  );
};

UsernameScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Choose a Username",
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
  button: {
    margin: 20,
  },
});

export default UsernameScreen;
