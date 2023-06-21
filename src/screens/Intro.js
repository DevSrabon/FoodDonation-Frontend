import { View, Text, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Intro = () => {
  const navigation=useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Intro</Text>
      <Pressable onPress={() => navigation.navigate("login")}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default Intro;
