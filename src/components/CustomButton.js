import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ onPress, text, type, bgColor, fgColor,disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxHeight: 50,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_primary: {
    backgroundColor: "#B4AAF2",
  },
  container_tertiary: {
    width: "30%",
    padding: 0,
    // alignSelf: "center",

    marginVertical: 0,
    // marginHorizontal: 50,
  },
  text: {
    fontFamily: "SemiBold",
    fontSize: 14,
    color: "white",
  },
  text_tertiary: {
    color: "#B4AAF2",
    // color: "white",
  },
});

export default CustomButton;
