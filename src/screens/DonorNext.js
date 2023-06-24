import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image } from "react-native";
import icons from "../../assets/icons";

const DonorNext = () => {
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "flex-start" }}>
        <Text style={{ fontFamily: "SemiBold", fontSize: 18 }}>
          Cafe Bilhares
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Image source={icons.location} />
          <Text style={{ fontFamily: "Medium", fontSize: 10 }}>
            North landing Guide road. Rd. MGR Avenue, New Delhi 854867
          </Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image source={icons.image1} style={styles.image} />
      </View>
      <View style={{ flexDirection: "row" }}>
        <View></View>
        <View></View>
        <View></View>
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 10,
  },
  imageContainer: {
    borderColor: "red",
    borderWidth: 1,
    width: "100%",
    borderRadius: 7,
  },
  image: {
    resizeMode: "cover",
  },
});

export default DonorNext;
