import { TouchableWithoutFeedback,TouchableOpacity,Animated, Text, StyleSheet, Pressable } from "react-native";
import React,{useState} from "react";

const CustomButton = ({ onPress, text, type, bgColor, fgColor, disabled }) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.timing(scaleValue, {
      toValue: 0.9,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true
      }).start();
    })
  }
  const handlePress = () => {
    // Call both functions
    animateButton();
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
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
    </TouchableOpacity>
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
