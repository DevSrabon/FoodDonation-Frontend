import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
  keyboardType,
  editable,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        editable={editable}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    borderColor: "#A2A2A6",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    marginBottom: 20,
  },
  input: {},
});

export default CustomInput;
