import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

import * as WebBrowser from "expo-web-browser";
import React, { useContext, useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { AuthContext } from "../context/Provider";
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  const navigation = useNavigation();

  const { signIn, promptAsync, user, loading, setLoading } =
    useContext(AuthContext);
  if (user?.email) {
    navigation.navigate("otp");
  }
  const [inputField, setInputField] = useState({
    email: "",
    password: "",
  });
  const handleChangeText = (key, value) => {
    setInputField((prevInputField) => ({
      ...prevInputField,
      [key]: value,
    }));
  };
  const handleLogin = () => {
    signIn(inputField.email, inputField.password)
      .then((result) => {
        console.log(result);
        setLoading(false);
        navigation.navigate("otp");
      })
      .catch((err) => {
        console.log(err);
        alert(err);
        setLoading(false);
      });
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          value={inputField.email}
          onChangeText={(text) => handleChangeText("email", text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text>Password</Text>
        <TextInput
          value={inputField.password}
          onChangeText={(text) => handleChangeText("password", text)}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button title="Log In" onPress={handleLogin} />
        <FontAwesome.Button
          name="google"
          backgroundColor="#3b5998"
          onPress={() => promptAsync({ useProxy: false, showInRecents: true })}
        >
          Login with google
        </FontAwesome.Button>
      </View>
      <Pressable onPress={() => navigation.navigate("signup")}>
        <Text>Sign Up</Text>
      </Pressable>
    </View>
  );
};

export default Login;
