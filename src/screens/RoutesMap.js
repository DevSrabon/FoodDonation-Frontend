import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RoutesMap = () => {
  const route = useRoute();
  const user = route.params;
  console.log("🚀 ~ file: RoutesMap.js:8 ~ RoutesMap ~ user:", user);
  return (
    <View>
      <Text>RoutesMap</Text>
    </View>
  );
};

export default RoutesMap;

const styles = StyleSheet.create({});
