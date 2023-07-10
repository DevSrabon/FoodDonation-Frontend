import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

const NewInput = ({ label }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text>{label}</Text>
      </View>
      <TextInput placeholder="Email" style={styles.input} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "80%",
    justifyContent: "center",
  },
  input: {
    padding: 20,
  },
});
export default NewInput;
