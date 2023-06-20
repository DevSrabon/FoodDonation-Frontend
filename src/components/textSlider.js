import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SliderText from "react-native-slider-text";

const Score = () => {
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Little interest or pleasure in doing things?
      </Text>
      <Text style={styles.tag}>Rate your answer here: </Text>
      <SliderText
        maximumValue={10}
        stepValue={1}
        minimumValueLabel="Never"
        maximumValueLabel="Always"
        onValueChange={(id) => setSliderValue(id)}
        sliderValue={sliderValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  tag: {
    fontSize: 14,
    paddingVertical: 10,
  },
});

export default Score;
