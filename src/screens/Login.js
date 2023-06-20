import { View, Text, Pressable } from "react-native";
import React from "react";

const Login = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
      <Pressable onPress={() => navigation.navigate("signup")}>
        <Text>signup</Text>
      </Pressable>
    </View>
  );
};

export default Login;
