import { View, Text } from "react-native";
import React from "react";
import Score from "../components/textSlider";

const Home = () => {
  return (
    <View>
      <Text style={{ fontFamily: "Bold", fontSize: 30 }}>Home</Text>
      <Score />
    </View>
  );
};

export default Home;
