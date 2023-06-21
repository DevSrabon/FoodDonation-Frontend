import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import icons from "../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setChecked] = useState(false);

  const onSignInPressed = () => {
    console.warn("signin");
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const onSignInFacebook = () => {
    console.warn("Facebook");
  };

  const onSignInGoogle = () => {
    console.warn("Google");
  };

  const onSignInLinkedin = () => {
    console.warn("linkedin");
  };

  const onSignup = () => {
    navigation.navigate("signup");
  };

  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 28, bottom: 20, right: 145 }}
      >
        Login
      </Text>
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 160, top: 6 }}
      >
        E-mail
      </Text>

      <CustomInput placeholder="Your Email" value={email} setValue={setEmail} />

      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 150, top: 6 }}
      >
        Password
      </Text>
      <CustomInput
        placeholder="Your Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 130,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#B4AAF2" : undefined}
          />
          <Text
            style={{ fontFamily: "Medium", fontSize: 12, color: "#747980" }}
          >
            Remember me
          </Text>
        </View>

        <CustomButton
          text="Forgot Password"
          onPress={onForgotPasswordPressed}
          type="tertiary"
        />
      </View>

      <CustomButton text="Login" onPress={onSignInPressed} type="primary" />

      <Text
        style={{
          fontFamily: "SemiBold",
          fontSize: 12,
          marginBottom: 10,
          marginTop: 20,
        }}
      >
        or continue with
      </Text>
      <View style={styles.subContainer}>
        <Pressable style={styles.box}>
          <Image source={icons.fb} />
        </Pressable>
        <Pressable style={styles.box}>
          <Image source={icons.google} />
        </Pressable>
        <Pressable style={styles.box}>
          <Image source={icons.linked} />
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          top: 80,
        }}
      >
        <Text style={{ fontFamily: "SemiBold", fontSize: 12 }}>
          Don,t have an account?
          <CustomButton text="Signup" onPress={onSignup} type="tertiary" />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  subContainer: {
    flexDirection: "row",

    gap: 20,
  },
  box: {
    width: 72,
    heigh: 68,
    padding: 16,
    borderRadius: 6,
    borderColor: "#EBE9F1",
    borderWidth: 1,
  },
  checkbox: { marginRight: 3 },
});
export default Login;
