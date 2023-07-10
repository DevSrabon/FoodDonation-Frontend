import { View, Text, StyleSheet } from "react-native";
import React from "react";
import NewInput from "./NewInput";

const AniInput = () => {
  return (
    <View style={styles.container}>
      <NewInput />;
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
  },
});

export default AniInput;
