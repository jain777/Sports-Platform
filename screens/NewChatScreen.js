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
  const [groupIdValidity, setgroupIdValidity] = useState(false);
  const [isJoin, setIsJoin] = useState(false);
  const [groupId, setGroupId] = useState("");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [{ text: "Ok" }]);
    }
  }, [error]);
  const submitHandler = useCallback(async () => {
    if (!isJoin) {
      if (!nameValidity) {
        Alert.alert("Wrong input!", "Please check the errors in the form.", [
          { text: "Okay" },
        ]);
        return;
      }
    } else {
      if (!groupIdValidity) {
        Alert.alert("Wrong input!", "Please check the errors in the form.", [
          { text: "Okay" },
        ]);
        return;
      }
    }

    setError(null);
    setIsLoading(true);
    try {
      if (!isJoin) {
        await dispatch(chatlistActions.createChatGroup(name));
      } else {
        await dispatch(chatlistActions.joinChatGroup(groupId));
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [
    isJoin,
    setError,
    setIsLoading,
    name,
    groupId,
    groupIdValidity,
    nameValidity,
    dispatch,
  ]);
  const inputChangeHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setName(inputValue);
      setNameValidity(inputValidity);
    },
    [setNameValidity, setName]
  );
  const groupIdChangedHandler = useCallback(
    (_, inputValue, inputValidity) => {
      setGroupId(inputValue);
      setgroupIdValidity(inputValidity);
    },
    [setGroupId]
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
        {isJoin ? (
          <View>
            <Input
              id="groupId"
              label="Group ID"
              errorText="Please enter a valid Group ID!"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={groupIdChangedHandler}
              initialValue={""}
              initiallyValid={true}
              minLength={7}
            />
          </View>
        ) : (
          <View>
            <Input
              id="title"
              label="Title"
              errorText="Please enter a valid title!"
              keyboardType="default"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              initialValue={""}
              initiallyValid={false}
              minLength={5}
            />
          </View>
        )}
        <View style={styles.button}>
          <Button
            color={Colors.accent}
            onPress={submitHandler}
            title={isJoin ? "Join Group" : "Create Group"}
          />
        </View>
        <View style={styles.button}>
          <Button
            color={Colors.accent}
            onPress={() => {
              setIsJoin((prevState) => !prevState);
            }}
            title={isJoin ? "Create A Group" : "Join A Group"}
          />
        </View>
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
  button: {
    margin: 20,
  },
});

export default NewChatScreen;
