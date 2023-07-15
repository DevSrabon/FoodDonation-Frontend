import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../components/Header";
import InitContainer from "../components/initContainer";
import Onboarding from "../components/Carousel/Onboarding";

const DashBoard = () => {
  return (
    <InitContainer>
      <Text
        style={{
          marginTop: 40,
          color: "white",
          fontFamily: "Bold",
          fontSize: 28,
        }}
      >
        Dashboard
      </Text>

      <View style={styles.topContainer}></View>
      <View style={styles.subContainer}>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Needy</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
        </View>
        <View style={styles.cardContainer}>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
          <View style={[styles.card, styles.shadow]}>
            <Text>Total Donor</Text>
          </View>
        </View>
      </View>
    </InitContainer>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 0.1,
  },
  subContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    borderTopStartRadius: 17,
    borderTopEndRadius: 17,
    // maxHeight: 00,
    // justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: "45%",
    height: 150,
    marginVertical: 10,
  },
  shadow: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 10,
  },
});

export default DashBoard;
