import { View, Text, Pressable } from "react-native";
import React from "react";

const Signup = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Signup</Text>
      <Pressable onPress={() => navigation.navigate("otp")}>
        <Text>OTP</Text>
      </Pressable>
    </View>
  );
};

export default Signup;
