import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../components/CustomButton";

const Signup = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = () => {
    navigation.navigate("otp");
  };
  const onLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 28, bottom: 20, right: 145 }}
      >
        Signup
      </Text>
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 150, top: 6 }}
      >
        First Name
      </Text>
      <CustomInput
        placeholder="Your First Name"
        value={firstName}
        setValue={setFirstName}
      />
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 150, top: 6 }}
      >
        Last Name
      </Text>
      <CustomInput
        placeholder="Your Last Name"
        value={lastName}
        setValue={setLastName}
      />
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 137, top: 6 }}
      >
        Phone Number
      </Text>
      <CustomInput
        placeholder="Your Phone Number"
        value={phoneNumber}
        setValue={setPhoneNumber}
      />
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 165, top: 6 }}
      >
        E-mail
      </Text>

      <CustomInput placeholder="Your Email" value={email} setValue={setEmail} />
      <Text
        style={{ fontFamily: "SemiBold", fontSize: 14, right: 155, top: 6 }}
      >
        Password
      </Text>
      <CustomInput
        placeholder="Your Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <Text
        style={{
          fontFamily: "Medium",
          fontSize: 14,
          lineHeight: 20,
          marginBottom: 20,
        }}
      >
        By signing up you agree to our{" "}
        <Text style={{ fontSize: 16 }}>Terms & Condition</Text> and{" "}
        <Text style={{ fontSize: 16 }}>Privacy Policy.*</Text>
      </Text>
      <CustomButton text="Continue" onPress={onSignup} type="primary" />

      <Text
        style={{
          fontFamily: "SemiBold",
          fontSize: 12,
          textAlign: "center",
          top: 50,
        }}
      >
        Already signed up ?
        <CustomButton text="Login" onPress={onLogin} type="tertiary" />
      </Text>
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
});

export default Signup;
